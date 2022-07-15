use prefpoll::run; // import run from lib.rs

// required to run main since async not typically allowed
#[tokio::main]
async fn main() -> std::io::Result<()> {
    // creates a server and listenes to the port indefinitely, handling requests
    // bubbled up io error on failure to bind port
    run()?.await
}
