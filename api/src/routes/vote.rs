use actix_web::{dev::ConnectionInfo, web, HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Serialize)]
pub struct VoteInfo {
    pub question: String,
    pub options: String,
    pub created_at: String,
    pub duplication: String,
    pub ip_detected: bool,
    pub ip: String,
}
// handler to return success code 200
pub async fn vote(
    connection: ConnectionInfo,
    info: web::Path<String>,
    pool: web::Data<PgPool>,
) -> impl Responder {
    let id = info.into_inner();
    let id = match Uuid::parse_str(&id) {
        Ok(val) => val,
        Err(_) => return HttpResponse::BadRequest().body("uuid parse failed"),
    };
    match get_vote_info(connection, id, &pool).await {
        Ok(vote_info) => {
            let vote_info = serde_json::to_string(&vote_info).expect("serialization failed");
            HttpResponse::Ok().body(vote_info)
        }
        Err(_) => HttpResponse::NotFound().body("sql query failed: id not found"),
    }
}

pub async fn get_vote_info(
    connection: ConnectionInfo,
    id: Uuid,
    pool: &PgPool,
) -> Result<VoteInfo, sqlx::Error> {
    let vote_info = sqlx::query!(
        "SELECT question, options, created_at, duplication FROM polls WHERE id = $1",
        id
    )
    .fetch_one(pool)
    .await?;

    let client_ip = connection
        .realip_remote_addr()
        .expect("couldn't get client ip");
    let mut contains_ip = false;
    if vote_info.duplication.eq("ip") {
        contains_ip = sqlx::query!(
            "SELECT * FROM ip WHERE address = $1 AND id = $2",
            client_ip,
            id
        )
        .fetch_one(pool)
        .await
        .is_ok();
    }

    let vote_info = VoteInfo {
        question: vote_info.question,
        options: vote_info.options,
        created_at: vote_info.created_at.to_rfc3339(),
        duplication: vote_info.duplication,
        ip_detected: contains_ip,
        ip: client_ip.to_owned(),
    };
    Ok(vote_info)
}
