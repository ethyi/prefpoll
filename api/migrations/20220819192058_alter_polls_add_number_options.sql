-- Add migration script here
-- Add migration script here
-- Add migration script here
DROP TABLE polls;

CREATE TABLE polls(
	id uuid NOT NULL,
	PRIMARY KEY (id),
	question TEXT NOT NULL,
	options TEXT NOT NULL,
    number_options SMALLINT NOT NULL,
    results TEXT NOT NULL,
    ranking TEXT NOT NULL,
    total_votes BIGINT NOT NULL,
	created_at timestamptz NOT NULL
);
