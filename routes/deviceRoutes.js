const express = require('express');
const router = express.Router();
const { createNewDevice, getHomeDevices, controlDevice, changeDeviceRoom } = require('../db/controllers/deviceController');

router.get('/devices/:userId', getHomeDevices);
router.post('/control-device', controlDevice);
router.post('/change-room', changeDeviceRoom);

//router.post('/:homeId/rooms/:roomId/createNewDevice', createNewDevice);

router.post('/homes/:homeId/rooms/:roomId/devices', createNewDevice);


module.exports = router;