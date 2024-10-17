const { google } = require('googleapis');
const {insertUserTable, insertEventsTable} = require('../database/insertTable')
const {fetchGroupEvents} = require('../models/groupModel');
const { checkConflict } = require('../models/freeTime');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
 
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
      const { tokens } = await oauth2Client.getToken(code);
      const refresh_token = tokens.refresh_token;
      const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days expiry
  
      oauth2Client.setCredentials(tokens);
      const { data: userInfo } = await google.oauth2('v2').userinfo.get({
        auth: oauth2Client
    });

    console.log("bye");

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

  exports.freeTime = async(req, res) => {
    try{
      const dummyGroupId = 1;
      const response = await fetchGroupEvents(dummyGroupId);
      checkConflict(response);
    }catch(exception){
      console.log(exception);
    }
    res.send({ message: 'API route is working' });
  };