const mongoose = require('mongoose');
const User = require('../models/User');
const Home = require('../models/Home');
const Device = require('../models/Device');
const Room = require('../models/Room');

// Register a user and link homeId
const registerUser = async (req, res) => {
    try {
        const { name, email, password, homeId } = req.body;
        if (!name || !email || !password || !homeId) {
            return res.status(400).json({ message: 'Name, email, password, and homeId are required' });
        }

        const home = await Home.findById(homeId);
        if (!home) {
            return res.status(404).json({ message: 'Home does not exist' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const homeUsers = await User.find({ home_id: homeId });
        const role = homeUsers.length === 0 ? 'Admin' : 'User'; // First user is Admin

        const user = new User({
            name,
            email,
            password, // Add hashing in production
            role,
            home_id: homeId,
        });
        await user.save();

        if (!home.owner_id && role === 'Admin') {
            home.owner_id = user._id;
            await home.save();
        }

        res.status(201).json({ message: 'User registered', userId: user._id, role });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


// Assign Admin role (Admin only)
const assignAdminRole = async (req, res) => {
    try {
        const { adminId, userId } = req.body;
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ message: 'Only Admin can assign roles' });
        }

        const user = await User.findById(userId);
        if (!user || user.home_id.toString() !== admin.home_id.toString()) {
            return res.status(404).json({ message: 'User not found or not in same home' });
        }

        user.role = 'Admin';
        await user.save();

        res.status(200).json({ message: 'Admin role assigned', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning Admin role', error: error.message });
    }
};

module.exports = { registerUser, assignAdminRole };