const pool = require("../database/db")

const createUsersTable =  
    `CREATE TABLE IF NOT EXISTS users (
    user_id BIGSERIAL PRIMARY KEY,
    google_user_id VARCHAR(255) UNIQUE NOT NULL,  
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    refresh_token TEXT NOT NULL,
    token_expires_at TIMESTAMP)`;    

const createEventsTable = `CREATE TABLE IF NOT EXISTS events (
  event_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  google_event_id VARCHAR(255) UNIQUE 
)`;

const createGroupTable = `CREATE TABLE groups (
  group_id SERIAL PRIMARY KEY,
  group_name VARCHAR(255) NOT NULL
)`;

const createUserGroupTable = `CREATE TABLE user_group (
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  group_id INT REFERENCES groups(group_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, group_id)
)`;

const createFreeTimeTable = `CREATE TABLE free_time (
  free_time_id SERIAL PRIMARY KEY,
  group_id INT REFERENCES groups(group_id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL
)`;

async function createTables() {
    try {
    await pool.query(createUsersTable);
    await pool.query(createEventsTable);
    /*
    await pool.query(createGroupTable());
    await pool.query(createUserGroupTable());
    await pool.query(createFreeTimeTable());
    */
    console.log("Users table created successfully or already exists");
    } 
    catch (error) {
    console.error("Error creating users table", error);
    }
}
  
module.exports = {createTables}