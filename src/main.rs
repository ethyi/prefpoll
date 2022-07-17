use std::net::TcpListener;

use prefpoll::configuration::get_configuration;
use prefpoll::startup::run;
use prefpoll::telemetry::init_subscriber;
use secrecy::ExposeSecret;
use sqlx::PgPool; // import run from lib.rs
// required to run main since async not typically allowed
#[tokio::main]
async fn main() -> std::io::Result<()> {
    // initialize logging parameters
    init_subscriber("prefpoll".into(), "info".into(), std::io::stdout);
    // get configuration, panic if no config
    let configuration = get_configuration().expect("Failed to read configuration.");
    // establish postgres connection
    let connection = PgPool::connect(&configuration.database.connection_string().expose_secret())
        .await
        .expect("Failed to connect to postgres.");
    // establish address using config
    let address = format!("127.0.0.1:{}", configuration.application_port);
    // bind address to tcplistener
    let listener = TcpListener::bind(address).expect("Failed to bind to port");
    // creates a server and listenes to the port indefinitely, handling requests

    // bubbled up io error on failure to bind port
    run(listener, connection)?.await
}
