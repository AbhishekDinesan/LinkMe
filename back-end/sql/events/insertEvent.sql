INSERT INTO events (user_id, start_time, end_time, google_event_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (google_event_id) DO UPDATE
    SET
        start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time
    RETURNING *;