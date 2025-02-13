const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Helper function to create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Assuming User.login is a method in your user model
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        // Send response
        res.status(200).json({ email, token });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Assuming User.signup is a method in your user model
        const user = await User.signup(email, password);

        // Create a token
        const token = createToken(user._id);

        // Send response
        res.status(200).json({ email, token });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };