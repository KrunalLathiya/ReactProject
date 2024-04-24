const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });

        // Save the new user
        await user.save();
        // Generate a token
        const token = jwt.sign({ _id: user._id }, 'your_secret_key', { expiresIn: '24h' });  // Including an expiration for the token


        // Send a JSON response indicating success
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: token,
            data: {
                userId: user._id  // Optionally include some data (ensure to not send sensitive data like password)
            }
        });
    } catch (error) {
        // Send a JSON response indicating failure
        res.status(400).json({
            success: false,
            message: 'Registration failed',
            error: error.message  // Including error.message can help the client understand the failure reason
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists and the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({  // 401 Unauthorized is more appropriate here than 400 Bad Request
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate a token
        const token = jwt.sign({ _id: user._id }, 'your_secret_key', { expiresIn: '24h' });  // Including an expiration for the token

        // Send a successful response with the token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token  // Consider including more data if necessary, such as user details
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({
            success: false,
            message: 'An error occurred during login',
            error: error.message  // Providing error details can be helpful for debugging
        });
    }
});


module.exports = router;