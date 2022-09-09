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
	created_at timestamptz NOT NULL,
    duplication TEXT NOT NULL
);

CREATE TABLE ip(
    ip_id uuid NOT NULL,
    PRIMARY KEY (ip_id),
    id uuid NOT NULL,
    FOREIGN KEY (id) references polls(id),
    address TEXT NOT NULL
);