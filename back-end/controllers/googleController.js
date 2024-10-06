const { google } = require('googleapis');
const { insertRefreshToken } = require('../models/refreshTokenModel');
const oauth2Client = require('../utilities/oauth');

exports.getApiStatus = (req, res) => {
    res.send({ message: 'API route is working' });
  };


exports.createTokens = async (req, res, next) => {
    try {
      const { code } = req.body;
      console.log('Code received:', code);
  
      const { tokens } = await oauth2Client.getToken(code);
      const refresh_token = tokens.refresh_token;
      console.log('Just the refresh token:', refresh_token);
  
      const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days expiry
      await insertRefreshToken(refresh_token, expiresAt);
  
      oauth2Client.setCredentials(tokens);
  
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