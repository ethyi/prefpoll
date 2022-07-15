use std::net::TcpListener;

use prefpoll::{
    configuration::{get_configuration, DatabaseSettings},
    startup::run,
};
use sqlx::{Connection, Executor, PgConnection, PgPool};
use uuid::Uuid;
// spins up new runtime for every test, resources always cleaned up
#[tokio::test]
/// Test checks if
/// check exposed at /health_check
/// check behind GET method
/// check returns 200
/// check has no body
async fn health_check_works() {
    // run server, get address used
    let app = spawn_app().await;
    let address = app.address;
    // create a client using reqwest
    let client = reqwest::Client::new();
    // execute request to get response
    let response = client
        .get(format!("{address}/health_check"))
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
    let address = app.address;
    let configuration = get_configuration().expect("Failed to read config");
    let connection_string = configuration.database.connection_string();
    let mut connection = PgConnection::connect(&connection_string)
        .await
        .expect("Failed to connect to postgres.");

    let client = reqwest::Client::new();

    // Test correct post request
    let body = "question=Example%20Title&options=[o1,o2]";
    let response = client
        .post(&format!("{}/create_poll", &address))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    // Test postgres update
    let saved = sqlx::query!("SELECT question, options FROM poll")
        .fetch_one(&mut connection)
        .await
        .expect("Failed to fetch saved poll");
    assert_eq!(saved.question, "Example Title");
    assert_eq!(saved.options, "[o1,o2]");
}

#[tokio::test]
async fn create_poll_returns_a_400_when_data_is_missing() {
    // Arrange
    let app = spawn_app().await;
    let address = app.address;
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
            .post(&format!("{}/create_poll", &address))
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

pub struct TestApp {
    pub address: String, // app_address
    pub db_pool: PgPool,
}

// launch app in background, return address used, generates a random database to test on
async fn spawn_app() -> TestApp {
    // get configuration, panic if no config
    let mut configuration = get_configuration().expect("Failed to read configuration.");
    // override database name to be a random name
    configuration.database.database_name = Uuid::new_v4().to_string();
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
    let mut connection = PgConnection::connect(&config.connection_string_without_db())
        .await
        .expect("Failed to connect to Postgres");

    // create database
    connection
        .execute(format!(r#"CREATE DATABASE "{}";"#, config.database_name).as_str())
        .await
        .expect("Failed to create database.");

    // Migrate database
    let connection_pool = PgPool::connect(&config.connection_string())
        .await
        .expect("Failed to connect to Postgres.");

    sqlx::migrate!("./migrations")
        .run(&connection_pool)
        .await
        .expect("Failed to migrate the database");

    connection_pool
}
