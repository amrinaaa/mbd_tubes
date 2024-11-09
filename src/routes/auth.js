const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

// Rute untuk registrasi user
router.post('/registrasi', authController.regisUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
module.exports = router;