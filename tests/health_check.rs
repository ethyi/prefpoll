use prefpoll::run;
#[tokio::test]
/// Test checks if health check exposed at /health_check
/// health check behind GET method
/// check returns 200
/// check has no body
async fn health_check_works() {
    // spawn local server
    spawn_app();
    // create a client using reqwest
    let client = reqwest::Client::new();
    // execute request to get response
    let response = client
        .get("http://127.0.0.1:8000/health_check")
        .send()
        .await
        .expect("Failed to execute request.");
    // check if response is 200
    assert!(response.status().is_success());
    // check if response is empty body
    assert_eq!(Some(0), response.content_length());
}

// launch app in background
fn spawn_app() {
    let server = run().expect("Failed to bind address");
    // spawn a separate server concurrently
    tokio::spawn(server);
}
