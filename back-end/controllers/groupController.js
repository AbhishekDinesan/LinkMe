const {createGroup} = require('../models/groupModel');
const {fetchNameOfUsers, fetchUserIdFromName} = require('../database/insertTable')

exports.createGroups = async (req, res) => {
    try{
      const userNames = []; 
      if (req.body){
        req.body.ids.forEach((data) => {
          userNames.push(data);
        });
      }
      //userNames.map((element) => console.log("One element of userNames" + element));
      const userID = [];
      for (const element of userNames) {
        const user_id = await fetchUserIdFromName(element);
        userID.push(user_id);
      }
      const userIds = userID.map(element => parseInt(element.user_id, 10));
      console.log(userIds)
      await createGroup(userIds, "New Group");
      res.send({ message: 'API route is working' }); 
    }catch(exception){
      console.log(exception);
    }
    
  }

exports.fetchUsers = async(req, res) => {
  const response = await fetchNameOfUsers();
  res.send(response);
};