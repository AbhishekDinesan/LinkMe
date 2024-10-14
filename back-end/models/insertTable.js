
const pool = require('../database/db')
const {createTables} = require('../models/createTable')

const fetchUserID = `SELECT user_id FROM users WHERE google_user_id = $1;`;


const insertUser = `
    INSERT INTO users (google_user_id, name, email, refresh_token, token_expires_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (google_user_id) DO UPDATE
    SET 
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        refresh_token = EXCLUDED.refresh_token,
        token_expires_at = EXCLUDED.token_expires_at
    RETURNING *;
`;

const insertEvents = `
    INSERT INTO events (user_id, start_time, end_time, google_event_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (google_event_id) DO UPDATE
    SET
        start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time
    RETURNING *;
`;


async function insertUserTable(google_user_id, name, email, refresh_token, token_expires_at) {
    await createTables();
    try {
        const values = [google_user_id, name, email, refresh_token, token_expires_at];
        const result = await pool.query(insertUser, values);
        console.log("User inserted successfully:", result.rows[0]);
    } catch (error) {
        console.error("Error inserting into user table:", error);
    }
}

async function fetchInternalUserId(google_user_id){
    const result = await(pool.query(fetchUserID, [google_user_id])); 
    return result.rows[0];  
};

async function insertEventsTable(user_id, events_object) {
    try {
        const user = await fetchInternalUserId(user_id);
        const internalUserID = user.user_id;

        const startTimeUTC = new Date(events_object.start.dateTime).toISOString();
        const endTimeUTC = new Date(events_object.end.dateTime).toISOString();

        const values = [internalUserID, startTimeUTC, endTimeUTC, events_object.id];
        const result = await pool.query(insertEvents, values);
        console.log("Event inserted successfully:", result.rows[0]);
    } catch (error) {
        console.error("Error inserting into event table:", error);
    }
};

module.exports = {insertUserTable, insertEventsTable}