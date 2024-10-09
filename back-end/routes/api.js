const express = require('express');
const router = require('express').Router();
const googleController = require('../controllers/googleController');

router.get('/', googleController.getApiStatus);
router.post('/create-tokens', googleController.createTokens);
router.post('/create-event', googleController.createEvent);
router.get('/fetch-events', googleController.createEvent);

module.exports = router

