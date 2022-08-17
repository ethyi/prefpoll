use actix_web::{web, HttpResponse};
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;
#[derive(serde::Deserialize)]
pub struct FormData {
    question: String,
    options: String,
}

// macro that creates a span for logging the function invocation.
// all arguments and fields are attached to the context of the span
#[tracing::instrument(
    name = "Adding a new poll",
    skip(form, pool), // ignore these fields
    fields( // attach values to context
        poll_question = %form.question,
        poll_options = %form.options
    )
)]
// PgPool is a pool of PgConnections. When it receives a query, it takes
// a connection from the pool to execute. Allows concurrent queries
pub async fn create_poll(form: web::Form<FormData>, pool: web::Data<PgPool>) -> HttpResponse {
    match insert_poll(&pool, &form).await {
        Ok(id) => HttpResponse::Ok().body(id.to_hyphenated().to_string()),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// make separate log indicating saving poll details
#[tracing::instrument(name = "Saving new poll details in the database", skip(form, pool))]
pub async fn insert_poll(pool: &PgPool, form: &FormData) -> Result<Uuid, sqlx::Error> {
    // expected form.option value = "["A","B","C"]" as vec
    let options_len= match serde_json::from_str::<Vec<String>>(&form.options) {
        Ok(val ) => val.len(),
        // TODO consider handling logic in create_poll
        Err(_) => return Err(sqlx::Error::Protocol("deserialization failed".to_string()) )  
    };
    // serialized hashmap
    let results= "{}";
    // serialized Vec<Vec<usize>> 
    let ranking = match serde_json::to_string(&vec![(0usize..options_len).collect::<Vec<_>>()]) {
        Ok(val ) => val,
        // TODO consider handling logic in create_poll, panic unlikely though...
        Err(_) => return Err(sqlx::Error::Protocol("deserialization failed".to_string()) )
    };
    
    let total_votes =0;
    let id = Uuid::new_v4();
    sqlx::query!(
        r#"
        INSERT INTO polls (id, question, options, results, ranking, total_votes, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        "#,
        id, // new Uuid
        form.question,  // pass in form data
        form.options, // "["one","two","three"]", de to Vec<String>
        results, // de to hashmap<order, frequency>
        ranking, // "[3,2,1]" de to Vec<Vec<usize>>
        total_votes,
        Utc::now() // pass in current time
    )
    .execute(pool)
    .await
    .map_err(|e| {
        // log error then return
        tracing::error!("Failed to execute query: {:?}", e);
        e
    })?;
    Ok(id)
}
