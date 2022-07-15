#!/usr/bin/env bash

# bash script to initialize Postgresql databse

set -x
set -eo pipefail
# check if dependencies are met
if ! [ -x "$(command -v psql)" ]; then
	echo >&2 "Error: psql is not installed."
	exit 1
fi

if ! [ -x "$(command -v sqlx)" ]; then
	echo >&2 "Error: sqlx is not installed."
	echo >&2 "Use:"
	echo >&2 "	cargo install --version=0.5.7 sqlx-cli --no-default-features --features postgres"
	echo >&2 "to install it."
	exit 1
fi


# Check if custom user is set, else default to 'postgres'
DB_USER=${POSTGRES_USER:=postgres}
# check if custom password is set, else default to 'password'
DB_PASSWORD="${POSTGRES_PASSWORD:=password}"
# check if custom database name is set, else default to 'prefpoll'
DB_NAME="${POSTGRES_DB:=prefpoll}"
# check if custom port is set, else default to '5432'
DB_PORT="${POSTGRES_PORT:=5432}"

# skip Docker commands if dockerized databse is already running
if [[ -z "${SKIP_DOCKER}" ]]
then
	# Launch postgres using Docker
	docker run \
		-e POSTGRES_USER=${DB_USER} \
		-e POSTGRES_PASSWORD=${DB_PASSWORD} \
		-e POSTGRES_DB=${DB_NAME} \
		-p "${DB_PORT}":5432 \
		-d postgres \
		postgres -N 1000
	# ^ Increased maximum number of connections for testing purposes
fi

# Keep pinging Postgres until it's ready to accept commands
export PGPASSWORD="${DB_PASSWORD}"
# while loop to keep pinging, wait for healthy connection
until psql -h "localhost" -U "${DB_USER}" -p "${DB_PORT}" -d "postgres" -c '\q'; do
	>&2 echo "Postgres is still unavailable - sleeping"
	sleep 1
done

# create database when postgres can accept connections
>&2 echo "Postgres is up and running on port ${DB_PORT}!"
export DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}
sqlx database create
sqlx migrate run 
>&2 echo "Postgres has been migrated"

