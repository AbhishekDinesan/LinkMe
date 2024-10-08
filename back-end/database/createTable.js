const pool = require("../database/db")

const createRefreshTokenTable = (tableName) => {
    `CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE`
};

async function createTables(tableName) {
    try {
      await pool.query(createRefreshTokenTable(tableName));
      console.log("Users table created successfully or already exists");
    } catch (error) {
      console.error("Error creating users table", error);
    } finally {
      pool.end();
    }
  }
  
  createTables(tableName="refresh_token");