// listener binds to port, needed to get port for testing purposes
use std::net::TcpListener;

use crate::routes::{create_poll, health_check};
use actix_web::dev::Server; // import Server type
use actix_web::{web, App, HttpServer};
use sqlx::PgPool;

// pub to call by main, returns Err if fail to bind
pub fn run(listener: TcpListener, pool: PgPool) -> Result<Server, std::io::Error> {
    // wrap connection in Arc
    let pool = web::Data::new(pool);
    // main server, handles transport level concerns
    let server = HttpServer::new(move || {
        // app is where the application logic and route handlers live
        // each worker has their own copy of App with its own PgConnection
        App::new()
            // attach health check handler
            .route("/health_check", web::get().to(health_check))
            .route("/create_poll", web::post().to(create_poll))
            .app_data(pool.clone()) // attach database connection to state
    })
    // listen on TcpListener, returns Err if port is busy
    .listen(listener)?
    // execute
    .run(); // create server
    Ok(server) // return server
}
