use actix_web::{HttpResponse, Responder};

// handler to return success code 200
pub async fn health_check() -> impl Responder {
    // Response that returns success code 200
    HttpResponse::Ok()
}
