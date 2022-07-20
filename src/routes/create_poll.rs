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
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

// make separate log indicating saving poll details
#[tracing::instrument(name = "Saving new poll details in the database", skip(form, pool))]
pub async fn insert_poll(pool: &PgPool, form: &FormData) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO polls (id, question, options, created_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(), // new Uuiid
        form.question,  // pass in form data
        form.options,
        Utc::now() // pass in current time
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
