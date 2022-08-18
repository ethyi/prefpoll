use actix_web::{web,HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct FormData {
  order: String,
}

pub async fn add_vote(form: web::Form<FormData>, info: web::Path<String>, pool: web::Data<PgPool>) -> impl Responder {
    let id = info.into_inner();
    let id = match Uuid::parse_str(&id) {
        Ok(val) => val,
        Err(_) => return HttpResponse::BadRequest().body("uuid parse failed")
    };
    let vec :Vec<Vec<usize>>= match serde_json::from_str(&form.order)  {
      Ok(val) => val,
      Err(_) => return HttpResponse::BadRequest().body("deserialization to Vec<Vec<usize>> failed")
    };
    

    HttpResponse::Ok().finish()
}
