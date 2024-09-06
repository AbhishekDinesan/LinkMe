const express = require('express');
require('dotenv').config();
const {Client} = require('pg')


const app = express();

const client = new Client({
  host:process.env.HOST,
  user:process.env.USER,
  port:process.env.DBPORT,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
});


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
  } catch (err) {
    console.error('Error inserting refresh token:', err);
  }
}

async function runQueries() {
  try {
    await client.connect();
    await insertRefreshToken('your_refresh_token', '2024-12-31 23:59:59');
    const res = await client.query('SELECT * FROM refresh_tokens');
    console.log('Refresh tokens:', res.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    // Close the connection after all queries are done
    await client.end();
  }
}

runQueries();

app.use(express.json())

app.use('/api', require('./routes/api'))

app.use('/request-type', (req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('good stuff bud');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));