const express = require('express');
const router = require('express').Router();
const {google} = require('googleapis');


const app = express();
app.use(express.json());

router.get('/', async(req, res, next) => {
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
        const {tokens} = await oauth2Client.getToken(code) 
        const refresh_token = tokens.refresh_token; // need database logic
        console.log('Just the refresh token:', refresh_token);
        oauth2Client.setCredentials(tokens);
        res.send({ message: "Tokens set successfully", tokens });
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
});


module.exports = router

