const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const imageUpload = require('../utils/imageUpload');

const authController = require('../controllers/auth.controller');

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/login
router.post('/login', authController.login);

// GET /auth/user
router.get('/user', authController.getCurrentUser);

// POST /auth/logout
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
