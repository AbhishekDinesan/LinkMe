
const pool = require('./db')
const {createTables} = require('./createTable')
const {readSqlFile} = require("../utilities/readSql");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

async function insertUserTable(google_user_id, name, email, refresh_token, token_expires_at) {
    await createTables();
    try {
        const values = [google_user_id, name, email, refresh_token, token_expires_at];
        const insertUser = readSqlFile('../sql/users/insertUser.sql');
        const result = await pool.query(insertUser, values);
        console.log("User inserted successfully:", result.rows[0]);
    } catch (error) {
        console.error("Error inserting into user table:", error);
    }
}

async function fetchInternalUserId(google_user_id){
    const fetchUserId = readSqlFile('../sql/users/fetchUserId.sql');
    const result = await(pool.query(fetchUserId, [google_user_id])); 
    return result.rows[0];  
};

async function fetchUserIdFromName(userName){
    const fetchUserIdFromName = readSqlFile('../sql/users/fetchUserIdFromName.sql')
    const result = await(pool.query(fetchUserIdFromName, [userName])); 
    return result.rows[0]; 
}

async function fetchNameOfUsers(){
    try{
        const fetchUserNames = readSqlFile('../sql/users/fetchUserNames.sql');
        const result = await(pool.query(fetchUserNames)); 
        const userNames = result.rows.map(row => row.name);
        return userNames;
    }catch(exception){
        console.log(exception)
    }
}

async function fetchUsersInAGroup(group_id){
    const fetchUserQuery = readSqlFile('../sql/users/fetchUsersInGroup.sql');
    const result = await(pool.query(fetchUserQuery, [group_id])); 
    return result.rows;
}

async function fetchEvents(user_id){
    const fetchUserQuery = readSqlFile('../sql/events/fetchEventsFromUserId.sql');
    const result = await(pool.query(fetchUserQuery, [user_id])); 
    console.log("Result", result)
    return result.rows;
}

async function fetchUserNamefromUserId(user_id){
    const fetchUserQuery = readSqlFile('../sql/users/fetchUserNameFromId.sql');
    const result = await(pool.query(fetchUserQuery, [user_id])); 
    return result.rows;
}

async function insertEventsTable(user_id, events_object) {
    try {
        const user = await fetchInternalUserId(user_id);
        const insertEvents = readSqlFile('../sql/events/insertEvent.sql');
        const internalUserID = user.user_id;

        const startTime = dayjs(events_object.start.dateTime).format('YYYY-MM-DD HH:mm:ss');
        const endTime = dayjs(events_object.end.dateTime).format('YYYY-MM-DD HH:mm:ss');

        const values = [internalUserID, startTime, endTime, events_object.id];
        const result = await pool.query(insertEvents, values);
    } catch (error) {
        console.error("Error inserting into event table:", error);
    }
};

module.exports = {insertUserTable, insertEventsTable, fetchNameOfUsers, fetchUserIdFromName, fetchUsersInAGroup, fetchUserNamefromUserId, fetchEvents}