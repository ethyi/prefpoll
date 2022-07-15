-- create poll table
CREATE TABLE poll(
	id uuid NOT NULL,
	PRIMARY KEY (id), -- make random id primary key
	question TEXT NOT NULL, -- inputs not null
	options TEXT NOT NULL, 
	made_at timestamptz NOT NULL -- keep track of when poll was created
);

