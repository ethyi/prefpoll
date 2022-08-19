use std::collections::{HashMap, HashSet};

use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct FormData {
    order: String,
}

pub struct Poll {
    pub num_options: usize,
    pub results: HashMap<Vec<usize>, usize>,
    pub total_votes: usize,
}

pub async fn add_vote(
    form: web::Form<FormData>,
    info: web::Path<String>,
    pool: web::Data<PgPool>,
) -> impl Responder {
    let id = info.into_inner();
    let id = match Uuid::parse_str(&id) {
        Ok(val) => val,
        Err(_) => return HttpResponse::BadRequest().body("uuid parse failed"),
    };

    let poll = match get_poll_details(id, &pool).await {
        Ok(val) => val,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };
    let order = match serde_json::from_str::<Vec<usize>>(&form.order) {
        Ok(val) => {
            let mut unique = HashSet::new();
            val.iter().for_each(|x| {
                if *x < poll.num_options {
                    unique.insert(x);
                }
            });

            if unique.len() != poll.num_options {
                return HttpResponse::BadRequest().finish();
            }
            val
        }
        Err(_) => {
            return HttpResponse::BadRequest().body("deserialization to Vec<Vec<usize>> failed")
        }
    };

    HttpResponse::Ok().finish()
}
pub async fn get_poll_details(id: Uuid, pool: &PgPool) -> Result<Poll, sqlx::Error> {
    let poll = sqlx::query!(
        "SELECT number_options, results, total_votes FROM polls WHERE id = $1",
        id
    )
    .fetch_one(pool)
    .await?;
    let poll = Poll {
        num_options: poll.number_options as usize,
        results: serde_json::from_str(&poll.results).expect("failed to parse map"),
        total_votes: poll.total_votes as usize,
    };
    Ok(poll)
}
