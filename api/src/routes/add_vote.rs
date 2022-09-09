use std::collections::{HashMap, HashSet};

use actix_web::{dev::ConnectionInfo, web, HttpResponse, Responder};
use sqlx::PgPool;
use uuid::Uuid;

#[derive(serde::Deserialize)]
pub struct FormData {
    order: String,
}

pub struct Poll {
    pub num_options: usize,
    pub results: HashMap<String, usize>,
    pub total_votes: usize,
}

pub async fn add_vote(
    connection: ConnectionInfo,
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

    let total_votes = poll.total_votes + 1;
    let mut results = poll.results;
    *results
        .entry(serde_json::to_string(&order).unwrap())
        .or_insert(0) += 1;
    let rankings = calculate_poll_results(&results, total_votes, poll.num_options);

    match update_poll_details(connection, id, &pool, results, rankings, total_votes).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// update to sql, new total votes, rankings, results
pub async fn update_poll_details(
    connection: ConnectionInfo,
    id: Uuid,
    pool: &PgPool,
    results: HashMap<String, usize>,
    rankings: Vec<Vec<usize>>,
    total_votes: usize,
) -> Result<(), sqlx::Error> {
    let results = serde_json::to_string(&results).expect("failed to serialize hashmap");
    let rankings = serde_json::to_string(&rankings).expect("failed to serialize rankings");
    sqlx::query!(
        "UPDATE polls SET results=$2, ranking=$3, total_votes=$4 WHERE id = $1",
        id,
        results,
        rankings,
        total_votes as i64
    )
    .execute(pool)
    .await?;

    let ip_id = Uuid::new_v4();
    sqlx::query!(
        r#"
        INSERT INTO ip(ip_id, id, address)
        VALUES ($1, $2, $3)
        "#,
        ip_id, // new Uuid
        id,
        connection
            .realip_remote_addr()
            .expect("couldn't get client ip")
    )
    .execute(pool)
    .await
    .map_err(|e| {
        // log error then return
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;
    Ok(())
}

// update vote data, return resulting rankings
// TODO handle out of bounds unwraps, memory, performance, and reallocation overhead (async needed?)
// get_unchecked? avoid bounds checks and exploit guarantees for runtime
pub fn calculate_poll_results(
    results: &HashMap<String, usize>,
    total_votes: usize,
    num_options: usize,
) -> Vec<Vec<usize>> {
    let mut order = Vec::new();
    let mut ranked_options = HashSet::new();
    let mut removed_options = HashSet::new();

    while ranked_options.len() < num_options {
        let (mut min_percent, mut min_option) = (1.0, 0_usize);
        let (mut max_percent, mut max_option) = (0.0, 0_usize);
        let mut tallies = HashMap::new();
        for (key, value) in results.iter() {
            let mut index = 0;
            let key: Vec<usize> = serde_json::from_str(key).unwrap();
            let mut option = key[index];
            while ranked_options.contains(&option) || removed_options.contains(&option) {
                index += 1;
                option = key[index];
            }
            *tallies.entry(option).or_insert(0) += value;
        }

        for (key, value) in tallies.iter() {
            let percent = *value as f64 / total_votes as f64;
            if percent < min_percent {
                (min_percent, min_option) = (percent, *key);
            }
            if percent > max_percent {
                (max_percent, max_option) = (percent, *key);
            }
        }
        if max_percent == min_percent {
            tallies.keys().for_each(|x| {
                ranked_options.insert(*x);
            });
            removed_options.clear();

            order.push(tallies.into_keys().collect::<Vec<usize>>());
        } else if max_percent <= 0.5 {
            removed_options.insert(min_option);
        } else {
            ranked_options.insert(max_option);
            removed_options.clear();

            order.push(vec![max_option]);
        }
    }
    order
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
