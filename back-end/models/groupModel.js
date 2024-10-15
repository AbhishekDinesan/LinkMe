
const pool = require('../database/db')

const createGroupQuery = `
    INSERT INTO group_table (group_name) VALUES ($1) RETURNING group_id;
`;

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

module.exports = {createGroup};