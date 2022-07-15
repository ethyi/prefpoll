use actix_web::dev::Server; // import Server type
use actix_web::{web, App, HttpResponse, HttpServer, Responder};

// handler to return success code 200
async fn health_check() -> impl Responder {
    // Response that returns success code 200
    HttpResponse::Ok()
}

// pub to call by main, returns Err if fail to bind
pub fn run() -> Result<Server, std::io::Error> {
    // main server, handles transport level concerns
    let server = HttpServer::new(|| {
        // app is where the application logic and route handlers live
        App::new()
            // attach health check handler
            .route("/health_check", web::get().to(health_check))
    })
    // port to bind to, returns Err if port is busy
    .bind("127.0.0.1:8000")?
    // execute
    .run(); // create server
    Ok(server) // return server
}
