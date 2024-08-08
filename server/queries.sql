CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    phone VARCHAR,
    address VARCHAR,
    created_at TIMESTAMP Default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP Default CURRENT_TIMESTAMP
)