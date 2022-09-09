use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Serialize)]
pub struct ResultInfo {
    pub question: String,
    pub options: String,
    pub created_at: String,
    pub num_votes: usize,
    pub rankings: String,
}

pub async fn result(info: web::Path<String>, pool: web::Data<PgPool>) -> impl Responder {
    let id = info.into_inner();
    let id = match Uuid::parse_str(&id) {
        Ok(val) => val,
        Err(_) => return HttpResponse::BadRequest().body("uuid parse failed"),
    };
    match get_result_info(id, &pool).await {
        Ok(result_info) => {
            let result_info = serde_json::to_string(&result_info).expect("serialization failed");
            HttpResponse::Ok().body(result_info)
        }
        Err(_) => HttpResponse::NotFound().body("sql query failed: id not found"),
    }
}

pub async fn get_result_info(id: Uuid, pool: &PgPool) -> Result<ResultInfo, sqlx::Error> {
    let result_info = sqlx::query!(
        "SELECT question, options, created_at, total_votes, ranking FROM polls WHERE id = $1",
        id
    )
    .fetch_one(pool)
    .await?;
    let result_info = ResultInfo {
        question: result_info.question,
        options: result_info.options,
        created_at: result_info.created_at.to_rfc3339(),
        num_votes: result_info.total_votes as usize,
        rankings: result_info.ranking,
    };
    Ok(result_info)
}
