const express = require('express');
const router = express.Router();
const { /*generateHomeId, saveHomeDevices ,*/ getUserHomes } = require('../db/controllers/homeController');

//router.post('/generate-home', generateHomeId);
//router.post('/save-devices', saveHomeDevices);
router.get('/users/:userId/homes', getUserHomes);

module.exports = router;