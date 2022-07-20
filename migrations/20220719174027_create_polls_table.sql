--- Add migration script here
CREATE TABLE polls(
	id uuid NOT NULL,
	PRIMARY KEY (id),
	question TEXT NOT NULL,
	options TEXT NOT NULL,
	created_at timestamptz NOT NULL
);
