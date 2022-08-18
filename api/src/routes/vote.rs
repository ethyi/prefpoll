use actix_web::{web,HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Serialize)]
pub struct VoteInfo {
    pub question: String,
    pub options: String,
    pub created_at: String
}
// handler to return success code 200
pub async fn vote(info: web::Path<String>, pool: web::Data<PgPool>) -> impl Responder {
    let id = info.into_inner();
    let id = match Uuid::parse_str(&id) {
        Ok(val) => val,
        Err(_) => return HttpResponse::BadRequest().body("uuid parse failed")
    };
    match get_vote_info(id, &pool).await {
        Ok(vote_info) =>  {
            let vote_info = serde_json::to_string(&vote_info).expect("serialization failed");
            HttpResponse::Ok().body(vote_info)
        },
        Err(_) => HttpResponse::NotFound().body("sql query failed: id not found"),
    }
}

pub async fn get_vote_info(id: Uuid, pool: &PgPool) -> Result<VoteInfo, sqlx::Error> {
    let vote_info = sqlx::query!("SELECT question, options, created_at FROM polls WHERE id = $1", id)
        .fetch_one(pool)
        .await?;
    let vote_info = VoteInfo {
        question: vote_info.question,
        options: vote_info.options,
        created_at: vote_info.created_at.to_string(),
    };
    Ok(vote_info)
}