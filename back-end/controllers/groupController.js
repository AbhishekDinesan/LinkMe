const {createGroup} = require('../models/groupModel');
const {fetchNameOfUsers, fetchUserIdFromName,fetchUsersInAGroup, fetchUserNamefromUserId} = require('../database/insertTable')

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
      const response = await createGroup(userIds, "New Group");
      res.status(200).send({ groupId: response });
    }catch(exception){
      console.log(exception);
    }
    
  }

exports.fetchUsers = async(req, res) => {
  const response = await fetchNameOfUsers();
  res.send(response);
};

exports.fetchUsersInGroup = async(req,res) =>{
  const group_id =  req.query.group_id;
  const response = await fetchUsersInAGroup(group_id)
  const user_array = []
  for (const row of response){
    user_array.push(row.user_id);
  }
  res.send(user_array)
}

exports.fetchNameFromUserId = async(req, res) => {
  const user_id = req.query.user_id;
  console.log("User Id", req.query.user_id)
  const response = await fetchUserNamefromUserId(user_id)
  res.send(response);
}