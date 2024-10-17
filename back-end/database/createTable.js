const pool = require("./db")
const {readSqlFile} = require("../utilities/readSql");

async function createTables() {
    try {
    const createUsersTable = readSqlFile('../sql/users/createUserTable.sql');
    const createEventsTable = readSqlFile('../sql/events/createEventsTable.sql');
    const createGroupTable = readSqlFile('../sql/groups/createGroupTable.sql');
    const createUserGroupTable = readSqlFile('../sql/user_group/createUserGroupTable.sql');
    await pool.query(createUsersTable);
    await pool.query(createEventsTable);
    await pool.query(createGroupTable);
    await pool.query(createUserGroupTable);
    } 
    catch (error) {
    console.error("Error creating users table", error);
    }
}
  
module.exports = {createTables}