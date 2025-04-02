const express = require('express');
const router = express.Router();
const { registerUser,loginUser, checkUser } = require('../db/controllers/userController');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/check', checkUser);
//router.post('/assign-admin', assignAdminRole);

module.exports = router;