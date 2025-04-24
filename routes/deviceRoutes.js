const express = require('express');
const router = express.Router();
const { createNewDevice, getHomeDevices, controlDevice, changeDeviceRoom, deviceInfo, setDeviceStatus } = require('../db/controllers/deviceController');


//router.get('/devices/:userId', getHomeDevices);
//router.post('/change-room', changeDeviceRoom);

router.post('/devices/:deviceId/status', controlDevice);

router.get('/devices/:deviceId', deviceInfo);

//router.post('/:homeId/rooms/:roomId/createNewDevice', createNewDevice);

router.post('/homes/:homeId/rooms/:roomId/registerNewDevice', createNewDevice);

router.post('/devices/:deviceId/set-status', setDeviceStatus);



module.exports = router;