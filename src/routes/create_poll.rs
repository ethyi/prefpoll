use actix_web::{web, HttpResponse};
use chrono::Utc;
use sqlx::PgPool;
use uuid::Uuid;
#[derive(serde::Deserialize)]
pub struct FormData {
    question: String,
    options: String,
}
// PgPool is a pool of PgConnections. When it receives a query, it takes
// a connection from the pool to execute. Allows concurrent queries
pub async fn create_poll(form: web::Form<FormData>, pool: web::Data<PgPool>) -> HttpResponse {
    match sqlx::query!(
        r#"
        INSERT INTO poll (id, question, options, made_at)
        VALUES ($1, $2, $3, $4)
        "#,
        Uuid::new_v4(), // new Uuiid
        form.question,  // pass in form data
        form.options,
        Utc::now() // pass in current time
    )
    // get_ref gets immutable reference to Data<PgConnection>
    .execute(pool.get_ref())
    .await
    {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(e) => {
            println!("Failed to execute query: {}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}
