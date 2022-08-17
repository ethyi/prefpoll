-- Add migration script here
DROP TABLE polls;

CREATE TABLE polls(
	id uuid NOT NULL,
	PRIMARY KEY (id),
	question TEXT NOT NULL,
	options JSON NOT NULL,
  results JSON NOT NULL,
  ranking JSON NOT NULL,
  total_votes BIGINT NOT NULL,
	created_at timestamptz NOT NULL
);
