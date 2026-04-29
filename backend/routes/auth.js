const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);
router.post('/github', authController.githubAuth);
router.post('/forgot-password', authController.forgotPassword);

// Protected routes
router.get('/verify', authMiddleware, authController.verifyToken);
router.get('/users', authController.getAllUsers); // for debugging

module.exports = router;