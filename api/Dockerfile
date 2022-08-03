# 1. compute recipe file
FROM lukemathwalker/cargo-chef:latest-rust-1.59.0 as chef
# cd app
WORKDIR /app
# update linking config
RUN apt update && apt install lld clang -y

FROM chef as planner
COPY . .

# 2. Caching process
RUN cargo chef prepare --recipe-path recipe.json
FROM chef as builder
COPY --from=planner /app/recipe.json recipe.json
# Build our project dependencies, not our application!
RUN cargo chef cook --release --recipe-path recipe.json



# Up to this point, if our dependency tree stays the same,
# all layers should be cached.

# copy all files from working environment to docker image
COPY . .
# use query metadata instead of live database for compiling purposes
ENV SQLX_OFFLINE true
# Build our project with release profile
RUN cargo build --release --bin prefpoll

# 3. Runtime environment
# shave the weight of cargo, rustc, unrelated to running binary
FROM debian:bullseye-slim AS runtime
WORKDIR /app
# Install OpenSSL - it is dynamically linked by some of our dependencies
# Install ca-certificates - it is needed to verify TLS certificates
# when establishing HTTPS connections
RUN apt-get update -y \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	# Clean up
	&& apt-get autoremove -y \
	&& apt-get clean -y \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/prefpoll prefpoll
COPY configuration configuration
# set production configuration
ENV APP_ENVIRONMENT production
# launch binary on docker run
ENTRYPOINT ["./prefpoll"]

