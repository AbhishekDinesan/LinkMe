INSERT INTO users (google_user_id, name, email, refresh_token, token_expires_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (google_user_id) DO UPDATE
    SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        refresh_token = EXCLUDED.refresh_token,
        token_expires_at = EXCLUDED.token_expires_at
    RETURNING *;