CREATE TABLE IF NOT EXISTS events (
  event_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  google_event_id VARCHAR(255) UNIQUE 
);