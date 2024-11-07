const express = require('express');
const router = require('express').Router();
const googleController = require('../controllers/googleController');
const groupController = require('../controllers/groupController');

router.post('/create-tokens', googleController.createTokens);
router.post('/create-event', googleController.createEvent);
router.get('/fetch-events', googleController.fetchEvents);
router.post('/free-time', googleController.freeTime);

router.post('/create-groups', groupController.createGroups);

router.get('/fetch-users', groupController.fetchUsers);

module.exports = router;

