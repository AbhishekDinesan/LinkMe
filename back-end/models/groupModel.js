
const pool = require('../database/db')

const createGroupQuery = `
    INSERT INTO group_table (group_name) VALUES ($1) RETURNING group_id;
`;

const fetchGroupEventsQuery = `SELECT e.start_time, e.end_time
    FROM events e
    JOIN user_group ug ON e.user_id = ug.user_id
    WHERE ug.group_id = $1
    ORDER BY e.start_time ASC;`; // creates a table with start/end times for a given groupid 

const insertUsersIntoGroup = (userIds, groupId) => {
    const values = userIds.map((id, index) => `($${index + 1}, ${groupId})`).join(',');
    const query = `INSERT INTO user_group (user_id, group_id) VALUES ${values};`;
    return query;
  };


async function createGroup(userIds, groupName){
    try{
    const groupResult = await pool.query(createGroupQuery, [groupName]);
    const groupId = groupResult.rows[0].group_id;
    const insertQuery = insertUsersIntoGroup(userIds, groupId);
    await pool.query(insertQuery, userIds);
    }
    catch(exception){
        console.log(exception);
    }
};


async function fetchGroupEvents(group_id){
    try{
        const result = await pool.query(fetchGroupEventsQuery, [group_id]);
        return result.rows;
    }catch(exception){
        console.log(exception);
    }
}


module.exports = {createGroup, fetchGroupEvents};