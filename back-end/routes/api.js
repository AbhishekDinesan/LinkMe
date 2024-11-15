const express = require('express');
const router = require('express').Router();
const googleController = require('../controllers/googleController');
const groupController = require('../controllers/groupController');
const TMController = require('../controllers/ticketMasterController')

router.post('/create-tokens', googleController.createTokens);
router.post('/create-event', googleController.createEvent);
router.get('/fetch-events', googleController.fetchEvents);
router.post('/free-time', googleController.freeTime);
router.post('/create-groups', groupController.createGroups);
router.get('/fetch-users', groupController.fetchUsers);
router.get('/fetch-TMevents', TMController.fetchTMevents) // make a new ticker master controller


module.exports = router;

