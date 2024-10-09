const { google } = require('googleapis');
const { insertRefreshToken } = require('../models/refreshTokenModel');
const oauth2Client = require('../utilities/oauth');
const {insertUserTable} = require('../models/insertTable')

const sampleEventId = '754glbobtnmhosveqbpgt3nrir';

exports.getApiStatus = (req, res) => {
    res.send({ message: 'API route is working' });
  };


exports.retrieveGoogleID = async() =>{
  const userInfo = await oauth2Client.userinfo.get();
  console.log(userInfo)
}

async function fetchUserCalendarEvents(userId) {
  // Fetch the stored refresh token for the user from your database
  const storedRefreshToken = await getRefreshTokenForUser(userId); // Implement this function

  if (!storedRefreshToken) {
    throw new Error('No refresh token found for user');
  }

  // Set the credentials for the OAuth2 client
  oauth2Client.setCredentials({
    refresh_token: storedRefreshToken,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary', // 'primary' is the user's primary calendar
      timeMin: new Date().toISOString(), // You can set a specific time range if needed
      maxResults: 100, // Number of events to fetch
      singleEvents: true, // Expand recurring events into instances
      orderBy: 'startTime', // Order events by start time
    });

    return response.data.items; // This will contain the list of events
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events from Google Calendar');
  }
}




exports.fetchEvents = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const events = await fetchUserCalendarEvents(userId);
    res.status(200).json(events);
  }
  catch(exception){

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

  
/*
  router.put('/update-event/:id', async (req, res, next) => {
    try {
        const { id } = req.params; // Get the event ID from the URL
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

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        // Update the event
        const response = await calendar.events.update({
            calendarId: 'primary',
            eventId: id, // Use the event ID
            resource: event,
        });

        res.status(200).send(response.data); // Return the updated event data
    } catch (error) {
        console.error('Error updating event:', error);
        next(error);
    }
});

router.put('/update-event/:id', async (req, res, next) => {
  try {
      const { id } = req.params; // Get the event ID from the URL
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

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      // Update the event
      const response = await calendar.events.update({
          calendarId: 'primary',
          eventId: id, // Use the event ID
          resource: event,
      });

      res.status(200).send(response.data); // Return the updated event data
  } catch (error) {
      console.error('Error updating event:', error);
      next(error);
  }
});
*/