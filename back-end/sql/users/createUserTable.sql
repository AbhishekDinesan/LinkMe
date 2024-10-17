CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    google_user_id VARCHAR(255) UNIQUE NOT NULL,  
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    refresh_token TEXT NOT NULL,
    token_expires_at TIMESTAMP);