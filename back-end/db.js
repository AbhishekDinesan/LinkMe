const { Client } = require('pg');
require('dotenv').config();

//Note that you can't implement SQL directly

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect(); // Establish database connection

async function insertRefreshToken(token, expiresAt) {
  try {
    const query = `
      INSERT INTO refresh_tokens (token, expires_at) 
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [token, expiresAt];

    const result = await client.query(query, values);
    console.log('Refresh token inserted:', result.rows[0]);
    return result.rows[0]; // Return the inserted row if needed
  } catch (err) {
    console.error('Error inserting refresh token:', err);
    throw err;
  }
}

module.exports = { insertRefreshToken };
