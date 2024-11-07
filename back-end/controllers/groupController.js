const {createGroup} = require('../models/groupModel');
const {fetchNameOfUsers} = require('../database/insertTable')

exports.createGroups = async (req, res) => {
    try{
      res.send({ message: 'API route is working' });
      const dummyIds = [1,2]; // hard-coded an array, and a name
      const response = await createGroup(dummyIds, "Amish Insurance Group");
    }catch(exception){
      console.log(exception);
    }
  }

exports.fetchUsers = async(req, res) => {
  const response = await fetchNameOfUsers();
  res.send(response);
};