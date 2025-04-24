
const express = require('express');
const router = express.Router();
const {submitTemperatureReading, getLatestTemperature} = require('../db/controllers/sensorController');

router.post('/devices/:deviceId/temperature', submitTemperatureReading);
router.get('/devices/:deviceId/temperature', getLatestTemperature);

module.exports = router;
