use std::net::TcpListener;

use prefpoll::{
    configuration::{get_configuration, DatabaseSettings},
    startup::run,
    telemetry::init_subscriber,
};
use sqlx::{Connection, Executor, PgConnection, PgPool};
use uuid::Uuid;

// allow one call to init_subscriber
use once_cell::sync::Lazy;

// init_subscriber, invoked once through the entirety of cargo test
static TRACING: Lazy<()> = Lazy::new(|| {
    let default_filter_level = "info".to_string();
    let subscriber_name = "test".to_string();
    // specify if you want logs TEST_LOG=true cargo test
    if std::env::var("TEST_LOG").is_ok() {
        init_subscriber(subscriber_name, default_filter_level, std::io::stdout);
    } else {
        init_subscriber(subscriber_name, default_filter_level, std::io::sink);
    };
});

pub struct TestApp {
    pub address: String, // app_address
    pub db_pool: PgPool,
}

// launch app in background, return address used, generates a random database to test on

async fn spawn_app() -> TestApp {
    // only invoke init_subscriber once, subsequent calls skipped
    Lazy::force(&TRACING);

    // get configuration, panic if no config
    let mut configuration = get_configuration().expect("Failed to read configuration.");
    // override database name to be a random name
    configuration.database.database_name = Uuid::new_v4().to_string();
    // establish database connection
    let pool = configure_database(&configuration.database).await;

    let address = "127.0.0.1:0"; // port 0 finds port not in use
                                 // bind port to listener
    let listener = TcpListener::bind(address).expect("Failed to bind port");
    // get port assigned to listener as int
    let port = listener.local_addr().unwrap().port();
    // create server
    let server = run(listener, pool.clone()).expect("Failed to bind address");
    // spawn a separate server concurrently
    tokio::spawn(server);

    TestApp {
        address: format!("http://127.0.0.1:{port}"),
        db_pool: pool,
    }
}

// Creates a testing database separate from the primary
async fn configure_database(config: &DatabaseSettings) -> PgPool {
    // connect to postgres instance
    let mut connection =
        PgConnection::connect_with(&config.without_db())
            .await
            .expect("Failed to connect to Postgres");

    // create database
    connection
        .execute(format!(r#"CREATE DATABASE "{}";"#, config.database_name).as_str())
        .await
        .expect("Failed to create database.");

    // Migrate database
    let connection_pool = PgPool::connect_with(config.with_db())
        .await
        .expect("Failed to connect to Postgres.");

    sqlx::migrate!("./migrations")
        .run(&connection_pool)
        .await
        .expect("Failed to migrate the database");

    connection_pool
}

// spins up new runtime for every test, resources always cleaned up
#[tokio::test]
async fn health_check_works() {
    // run server, get address used
    let app = spawn_app().await;
    // create a client using reqwest
    let client = reqwest::Client::new();
    // execute request to get response
    let response = client
        .get(format!("{}/health_check", &app.address))
        .send()
        .await
        .expect("Failed to execute request.");
    // check if response is 200
    assert!(response.status().is_success());
    // check if response is empty body
    assert_eq!(Some(0), response.content_length());
}

#[tokio::test]
async fn create_poll_returns_a_200_for_valid_form_data() {
    // Arrange
    let app = spawn_app().await;
    let client = reqwest::Client::new();

    // Test correct post request
    let body = r#"question=Example%20Title&options=["o1","o2"]"#;
    let response = client
        .post(&format!("{}/create_poll", &app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    let content = response.text().await.expect("failed to get body:");
    // Test postgres update
    let saved = sqlx::query!("SELECT * FROM polls")
        .fetch_one(&app.db_pool)
        .await
        .expect("Failed to fetch saved poll");


    assert_eq!(saved.id.to_string(), content);


    assert_eq!(saved.question, "Example Title");
    assert_eq!(saved.options, r#"["o1","o2"]"#);
    assert_eq!(saved.results, "{}");
    assert_eq!(saved.ranking, "[[0,1]]");
    assert_eq!(saved.total_votes, 0);
}

#[tokio::test]
async fn create_poll_returns_a_400_when_data_is_missing() {
    // Arrange
    let app = spawn_app().await;
    let client = reqwest::Client::new();
    let test_cases = vec![
        ("question=Example%20Title", "missing the options"),
        ("options=[o1,o2]", "missing the question"),
        // TODO check if more than two options
        ("", "missing both question and options"),
    ];
    for (invalid_body, error_message) in test_cases {
        // Act
        let response = client
            .post(&format!("{}/create_poll", &app.address))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        // Assert
        assert_eq!(
            400,
            response.status().as_u16(),
            // Additional customised error message on test failure
            "The API did not fail with 400 Bad Request when the payload was {}.",
            error_message
        );
    }
}

#[tokio::test]
async fn vote_returns_valid_poll_data() {
    // startup server and extract body
    let app = spawn_app().await;
    let client = reqwest::Client::new();

    let body = r#"question=Example%20Title&options=["o1","o2"]"#;
    let response = client
        .post(&format!("{}/create_poll", &app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    let content = response.text().await.expect("failed to get body:");

    // execute request to get response
    let response = client
        .get(format!("{}/vote/{}", &app.address, &content))
        .send()
        .await
        .expect("Failed to execute request.");
    // check if response is 200
    assert!(response.status().is_success());

    assert!(response.content_length().is_some());

    // println!("{}", response.text().await.expect("Failed to get body of GET vote/id"));
}


#[tokio::test]
async fn add_vote_returns_200_for_valid_vote_data() {
    // startup server and extract body
    let app = spawn_app().await;
    let client = reqwest::Client::new();

    let body = r#"question=Example%20Title&options=["one","two","three"]"#;
    let response = client
        .post(&format!("{}/create_poll", &app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    let id = response.text().await.expect("failed to get body:");

    // bad input post check [2,1] [2,2,1] 
    let test_cases = vec![
        ("order=[[2,1,0]]", "valid 1 vec"),
        ("order=[[2,1],[0]]", "valid 2 vec"),
        ("order=[[1],[2],[0]]", "valid 3 vec"),
    ];
    for (body, message) in test_cases {
        // Act
        let response = client
            .post(format!("{}/add_vote/{}", &app.address, &id))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(body)
            .send()
            .await
            .expect("Failed to execute request.");

        // Assert
        assert_eq!(
            200,
            response.status().as_u16(),
            // Additional customised error message on test failure
            "The API did not succeed with 200 when the payload was {}.",
            message
        );
    }
    // TODO 
    // check total votes, hashmap, and rank makes sense
}

#[tokio::test]
async fn add_vote_returns_400_for_valid_vote_data() {
    // startup server and extract body
    let app = spawn_app().await;
    let client = reqwest::Client::new();

    let body = r#"question=Example%20Title&options=["one","two","three"]"#;
    let response = client
        .post(&format!("{}/create_poll", &app.address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    let id = response.text().await.expect("failed to get id");


    let test_cases = vec![
        ("order=[2,1,0]", "invalid single vec"),
        ("order=[[2,1,0]]]", "invalid extra bracket"),
        ("order=[[2,1,3]]", "invalid out of bounds indices"),
        ("order=[[2,2,0]]", "invalid duplicate indices"),
        ("order=[[2,1,0],[1]]", "invalid duplicate indices / number of options"),
        ("order=[[2,1,0],[3]]", "invalid number of options: 2 vecs"),
        ("order=[[2,1,3,0]]", "invalid number of options: 1 vec"),
        ("", "missing all input"),
    ];
    for (invalid_body, error_message) in test_cases {
        // Act
        let response = client
            .post(format!("{}/add_vote/{}", &app.address, &id))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(invalid_body)
            .send()
            .await
            .expect("Failed to execute request.");

        // Assert
        assert_eq!(
            400,
            response.status().as_u16(),
            // Additional customised error message on test failure
            "The API did not fail with 400 Bad Request when the payload was {}.",
            error_message
        );

        // println!("{}", response.text().await.unwrap());
    }


}