const pool = require('../database/db')

async function insertRefreshToken(token, expiresAt) {
    try {
      const query = `
        INSERT INTO refresh_tokens (token, expires_at) 
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [token, expiresAt];
  
      const result = await pool.query(query, values);
      console.log('Refresh token inserted:', result.rows[0]);
      return result.rows[0]; // Return the inserted row if needed
    } catch (err) {
      console.error('Error inserting refresh token:', err);
      throw err;
    }
  }

module.exports = {insertRefreshToken};