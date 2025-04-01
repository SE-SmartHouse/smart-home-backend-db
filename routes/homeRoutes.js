const express = require('express');
const router = express.Router();
const { generateHomeId, saveHomeDevices } = require('../db/controllers/homeController');

router.post('/generate-home', generateHomeId);
router.post('/save-devices', saveHomeDevices);

module.exports = router;