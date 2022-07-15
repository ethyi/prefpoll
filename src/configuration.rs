// configuration file for hard coded values

#[derive(serde::Deserialize)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application_port: u16,
}
#[derive(serde::Deserialize)]
pub struct DatabaseSettings {
    pub username: String,
    pub password: String,
    pub port: u16,
    pub host: String,
    pub database_name: String,
}
impl DatabaseSettings {
    // return connection string to primary database
    pub fn connection_string(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}/{}",
            self.username, self.password, self.host, self.port, self.database_name
        )
    }
    // return a connection string to the postgres instance
    pub fn connection_string_without_db(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}",
            self.username, self.password, self.host, self.port
        )
    }
}

// read configuration into the Settings type
pub fn get_configuration() -> Result<Settings, config::ConfigError> {
    // initialize configuration reader
    let mut settings = config::Config::default();

    // add values from file named 'configuration'
    // looks for top level file with extension that 'config' knows how to parse
    // yaml, json ...
    settings.merge(config::File::with_name("configuration"))?;

    // try to convert settings to Settings type
    settings.try_into()
}
