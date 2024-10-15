const { google } = require('googleapis');
const { insertRefreshToken } = require('../models/refreshTokenModel');
const oauth2Client = require('../utilities/oauth');
const {insertUserTable, insertEventsTable} = require('../models/insertTable')
const {createGroup, fetchGroupEvents} = require('../models/groupModel');

const sampleEventId = '754glbobtnmhosveqbpgt3nrir';

exports.getApiStatus = (req, res) => {
    res.send({ message: 'API route is working' });
  };

  exports.freeTime = async(req, res) => {
    //parametrize the group id
    try{
      const dummyGroupId = 1;
      const response = await fetchGroupEvents(dummyGroupId);
      console.log(response)
    }catch(exception){
      console.log(exception);
    }
    res.send({ message: 'API route is working' });
  };

  exports.createGroups = async (req, res) => {
    try{
      res.send({ message: 'API route is working' });
      const dummyIds = [1,2]; // hard-coded an array
      const response = await createGroup(dummyIds, "Amish Insurance Group");
      // call 

    }catch(exception){
      console.log(exception);
    }
      
  }


exports.retrieveGoogleID = async() =>{
  const userInfo = await oauth2Client.userinfo.get();
  console.log(userInfo)
}

const calendar = google.calendar('v3');

exports.fetchEvents = async (req, res, next) => {
  const daysOut = 14; // parameterize
  try {
    const timeMin = new Date();
    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + daysOut);

    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary', 
      timeMin: timeMin.toISOString(), 
      timeMax: timeMax.toISOString(),
      maxResults: 100, 
      singleEvents: true, 
      orderBy: 'startTime', 
    });
    oauth2Client.setCredentials(await oauth2Client.credentials);

    const { data: userInfo } = await google.oauth2('v2').userinfo.get({
        auth: oauth2Client
    });

    const events = response.data.items;
    console.log(events)
    for (const event of events){
      await insertEventsTable(userInfo.id, event); // user id, info about the event
    }
  }
  catch(exception){
    console.log(exception);
  }
}


exports.createTokens = async (req, res, next) => {
    try {
      const { code } = req.body;
      console.log('Code received:', code);
  
      const { tokens } = await oauth2Client.getToken(code);
      const refresh_token = tokens.refresh_token;
      console.log('Just the refresh token:', refresh_token);
  
      const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days expiry
  
      oauth2Client.setCredentials(tokens);
      const { data: userInfo } = await google.oauth2('v2').userinfo.get({
        auth: oauth2Client
    });

    console.log("This is from userInfo: " + JSON.stringify(userInfo, null, 2));

    insertUserTable(userInfo.id, userInfo.name, userInfo.verified_email, refresh_token, expiresAt);
  
    res.send({ message: 'Tokens set successfully', tokens });
    } catch (error) {
      console.error('Error occurred:', error);
      next(error);
    }
  };



  exports.createEvent = async (req, res, next) => {
    try {
          const { eventName, eventDescription, startEvent, endEvent, startTime, endTime } = req.body;
      const event = {
        summary: eventName,
        description: eventDescription,
        start: {
          dateTime: `${startEvent}T${startTime}:00`,
          timeZone: 'America/Toronto',
        },
        end: {
          dateTime: `${endEvent}T${endTime}:00`,
          timeZone: 'America/Toronto',
        },
      };

      oauth2Client.setCredentials(await oauth2Client.credentials);

  
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
  
      res.status(200).send(response.data);
    } catch (error) {
      console.error('Error creating event:', error);
      next(error);
    }
  };
