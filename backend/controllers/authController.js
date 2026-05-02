const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// In-memory storage (replace with database in production)
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, name: user.name },
        JWT_SECRET, { expiresIn: JWT_EXPIRE }
    );
};

// Register
exports.register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create user
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            role: role || 'STUDENT',
            provider: 'local',
            createdAt: new Date()
        };

        users.push(user);

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Find user
        const user = users.find(u => u.email === email && u.provider === 'local');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Google OAuth Callback (simplified)
exports.googleAuth = async(req, res) => {
    try {
        const { token } = req.body;

        // In production, verify the token with Google
        // For now, we'll create a user with Google provider
        const googleUser = {
            id: `google_${Date.now()}`,
            name: 'Google User',
            email: `google_${Date.now()}@example.com`,
            provider: 'google',
            googleId: token
        };

        // Check if user exists
        const existingUser = users.find(u => u.provider === 'google' && u.googleId === token);
        let user = existingUser || googleUser;

        if (!existingUser) {
            users.push(user);
        }

        const authToken = generateToken(user);

        res.json({
            message: 'Google authentication successful',
            token: authToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role || 'STUDENT' }
        });
    } catch (err) {
        console.error('Google auth error:', err);
        res.status(500).json({ error: 'Google authentication failed' });
    }
};

// GitHub OAuth Callback (simplified)
exports.githubAuth = async(req, res) => {
    try {
        const { token } = req.body;

        const githubUser = {
            id: `github_${Date.now()}`,
            name: 'GitHub User',
            email: `github_${Date.now()}@example.com`,
            provider: 'github',
            githubId: token
        };

        const existingUser = users.find(u => u.provider === 'github' && u.githubId === token);
        let user = existingUser || githubUser;

        if (!existingUser) {
            users.push(user);
        }

        const authToken = generateToken(user);

        res.json({
            message: 'GitHub authentication successful',
            token: authToken,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error('GitHub auth error:', err);
        res.status(500).json({ error: 'GitHub authentication failed' });
    }
};

// Forgot Password
exports.forgotPassword = async(req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email required' });
        }

        // In production, send reset email
        res.json({
            message: 'Password reset link sent to your email',
            email
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

// Verify Token
exports.verifyToken = (req, res) => {
    try {
        res.json({
            valid: true,
            user: req.user
        });
    } catch (err) {
        res.status(401).json({ valid: false, error: 'Token invalid' });
    }
};

// Get all users (for debugging)
exports.getAllUsers = (req, res) => {
    res.json({ users: users.map(u => ({ id: u.id, name: u.name, email: u.email, provider: u.provider })) });
};
