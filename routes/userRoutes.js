const express = require('express');
const router = express.Router();
const { registerUser, getHomeDevices, controlDevice, changeDeviceRoom, assignAdminRole } = require('../db/controllers/userController');

router.post('/register', registerUser);
router.get('/devices/:userId', getHomeDevices);
router.post('/control-device', controlDevice);
router.post('/change-room', changeDeviceRoom);
router.post('/assign-admin', assignAdminRole);

module.exports = router;