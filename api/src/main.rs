use prefpoll::configuration::get_configuration;
use prefpoll::startup::run;
use prefpoll::telemetry::init_subscriber;
use sqlx::postgres::PgPoolOptions;
use std::net::TcpListener;

// required to run main since async not typically allowed
#[tokio::main]
async fn main() -> std::io::Result<()> {
    // initialize logging parameters
    init_subscriber("prefpoll".into(), "info".into(), std::io::stdout);
    // get configuration, panic if no config
    let configuration = get_configuration().expect("Failed to read configuration.");

    // establish postgres connection
    let connection = PgPoolOptions::new()
        .connect_timeout(std::time::Duration::from_secs(2))
        .connect_with(configuration.database.with_db())
        .await
        .expect("Failed to connect to Postgres.");

    // run database migrations on startup
    sqlx::migrate!("./migrations")
        .run(&connection)
        .await
        .expect("Failed to run database migrations.");

    let address = format!(
        "{}:{}",
        configuration.application.host, configuration.application.port
    );
    let listener = TcpListener::bind(address)?;
    run(listener, connection)?.await?;
    Ok(())
}
