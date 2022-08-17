use actix_web::{HttpResponse, Responder};

// handler to return success code 200
pub async fn vote() -> impl Responder {
    // Response that returns success code 200
    HttpResponse::Ok()
}
