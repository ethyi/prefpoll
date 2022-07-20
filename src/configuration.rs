use secrecy::{ExposeSecret, Secret};
use serde_aux::field_attributes::deserialize_number_from_string;
use sqlx::postgres::PgConnectOptions;
use sqlx::postgres::PgSslMode;
use sqlx::ConnectOptions;

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application: ApplicationSettings,
}

// group detials regarding the app_address
#[derive(serde::Deserialize)]
pub struct ApplicationSettings {
    #[serde(deserialize_with = "deserialize_number_from_string")]
    pub port: u16,
    pub host: String,
}

#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub username: String,
    pub password: Secret<String>,
    // parse string to u16
    #[serde(deserialize_with = "deserialize_number_from_string")]
    pub port: u16,
    pub host: String,
    pub database_name: String,
    // check if we need encrypted connection
    pub require_ssl: bool,
}

// The possible runtime environment for our application.
pub enum Environment {
    Local,
    Production,
}

impl Environment {
    // environment in string format
    pub fn as_str(&self) -> &'static str {
        match self {
            Environment::Local => "local",
            Environment::Production => "production",
        }
    }
}
// convert string to type
impl TryFrom<String> for Environment {
    type Error = String;
    fn try_from(s: String) -> Result<Self, Self::Error> {
        match s.to_lowercase().as_str() {
            "local" => Ok(Self::Local),
            "production" => Ok(Self::Production),
            other => Err(format!(
                "{} is not a supported environment. Use either 'local' or 'production'.",
                other
            )),
        }
    }
}

impl DatabaseSettings {
    // connection to postgres instance
    pub fn without_db(&self) -> PgConnectOptions {
        let ssl_mode = if self.require_ssl {
            PgSslMode::Require
        } else {
            PgSslMode::Prefer
        };
        PgConnectOptions::new()
            .host(&self.host)
            .username(&self.username)
            .password(&self.password.expose_secret())
            .port(self.port)
            .ssl_mode(ssl_mode)
    }
    // connection to exact postgres database
    pub fn with_db(&self) -> PgConnectOptions {
        let mut options = self.without_db().database(&self.database_name);
        // lower log level
        options.log_statements(tracing::log::LevelFilter::Trace);

        options
    }
}

// read configuration into the Settings type
pub fn get_configuration() -> Result<Settings, config::ConfigError> {
    //  initialize config reader
    let mut settings = config::Config::default();
    // get base path
    let base_path = std::env::current_dir().expect("Failed to determine the current directory");
    // get config file directory
    let configuration_directory = base_path.join("configuration");

    // add config values form a file named 'configuration'
    settings.merge(config::File::from(configuration_directory.join("base")).required(true))?;

    // detect running environment, parse string to enum
    let environment: Environment = std::env::var("APP_ENVIRONMENT")
        .unwrap_or_else(|_| "local".into())
        .try_into()
        .expect("Failed to parse APP_ENVIRONMENT.");

    // layer on higher level environment-specific values
    settings.merge(
        config::File::from(configuration_directory.join(environment.as_str())).required(true),
    )?;
    // Add in settings from environment variables (with a prefix of APP and '__' as separator)
    // E.g. `APP_APPLICATION__PORT=5001 would set `Settings.application.port`
    settings.merge(config::Environment::with_prefix("app").separator("__"))?;

    // try to convert the configuration values it read into
    settings.try_into()
}
