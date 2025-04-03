const express = require('express');
const router = express.Router();
const { registerUser,loginUser, checkUser, assignHomeToUser } = require('../db/controllers/userController');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/check', checkUser);
//router.post('/assign-admin', assignAdminRole);

router.post('/users/:userId/assign-home', assignHomeToUser); //lattest added route

module.exports = router;