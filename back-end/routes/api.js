const express = require('express');
const router = require('express').Router();
const {google} = require('googleapis');
const { insertRefreshToken } = require('../db'); 


const app = express();
app.use(express.json());

router.get('/', async(req, res, next) => {
    res.send({
        message: "api route is working"
    });
});

router.get('/add-event', async(req, res, next) => {
    res.send({
        message: "api route is working"
    });
});

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );


router.post('/create-tokens', async (req, res, next) => {
    try {
        const { code } = req.body; 
        console.log('Code received:', code);

        // Exchange the authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        const refresh_token = tokens.refresh_token; 
        console.log('Just the refresh token:', refresh_token);

        // Insert the refresh token into the database
        const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // Example expiry (30 days)
        await insertRefreshToken(refresh_token, expiresAt);

        // Set the credentials in OAuth client
        oauth2Client.setCredentials(tokens);

        res.send({ message: "Tokens set successfully", tokens });
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
});

router.post('/create-event', async (req, res, next) => {
    try {
      const { eventName, eventDescription, startEvent, endEvent, startTime, endTime } = req.body
  
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
  
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
  
      res.status(200).send(response.data);
    } catch (error) {
      console.error('Error creating event:', error);
      next(error);
    }
  });

module.exports = router

