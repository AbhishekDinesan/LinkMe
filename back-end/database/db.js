const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DBPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

client.connect() 
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error:', err.stack));

module.exports = client;
