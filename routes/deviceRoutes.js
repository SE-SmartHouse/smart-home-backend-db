const express = require('express');
const router = express.Router();
const { getHomeDevices, controlDevice, changeDeviceRoom } = require('../db/controllers/deviceController');

router.get('/devices/:userId', getHomeDevices);
router.post('/control-device', controlDevice);
router.post('/change-room', changeDeviceRoom);

module.exports = router;