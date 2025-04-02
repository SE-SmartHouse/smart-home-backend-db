const express = require('express');
const router = express.Router();
const { /*getHomeDevices, changeDeviceRoom,*/ controlDevice, deviceInfo } = require('../db/controllers/deviceController');

//router.get('/devices/:userId', getHomeDevices);
//router.post('/change-room', changeDeviceRoom);

router.post('/devices/:deviceId/status', controlDevice);

router.get('/devices/:deviceId', deviceInfo);

module.exports = router;