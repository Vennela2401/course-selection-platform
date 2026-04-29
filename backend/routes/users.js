const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        user: req.user
    });
});

// Update user profile
router.put('/profile', authMiddleware, (req, res) => {
    try {
        const { name, bio } = req.body;
        res.json({
            message: 'Profile updated successfully',
            user: {
                ...req.user,
                name: name || req.user.name,
                bio
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;