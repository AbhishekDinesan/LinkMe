
const pool = require('../database/db')
const {createTables} = require('../models/createTable')


const insertUser = `
    INSERT INTO users (google_user_id, name, email, refresh_token, token_expires_at)
    VALUES ($1, $2, $3, $4, $5)
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

module.exports = {insertUserTable}