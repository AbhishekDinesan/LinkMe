const express = require('express');
const router = require('express').Router();
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

router.get('/', async(req, res, next) => {
    res.send({
        message: "api route is working"
    });
});

router.post('/create-tokens', async (req, res, next) => {
    try {
        const { credential } = req.body; 
        console.log('Credential received:', credential);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        }); 
        const payload = ticket.getPayload();
        console.log('Payload:', payload);
        res.send({ message: "Token verified successfully", credential});
    } catch (error) {
        console.error('Error occurred:', error);
        next(error);
    }
});


module.exports = router

