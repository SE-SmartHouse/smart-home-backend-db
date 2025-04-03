const mongoose = require('mongoose');
const User = require('../models/User');
const Home = require('../models/Home');
const Device = require('../models/Device');
const Room = require('../models/Room');

// Register a user ,using name,email and password
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
            return res.status(400).json({ message: 'Name, email, password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
/*
        const homeUsers = await User.find({ home_id: homeId });
        const role = homeUsers.length === 0 ? 'Admin' : 'User'; // First user is Admin

        */
        const user = new User({
            name,
            email,
            password // Add hashing in production
        });

        await user.save();

        /*

        if (!home.owner_id && role === 'Admin') {
            home.owner_id = user._id;
            await home.save();
        }
            */

        res.status(200).json({ message: 'User registered' /*, userId: user._id, role*/ });
    } catch (error) {
        if (error) {
            return res.status(500).json({ message: 'Error registering user', error: error.message });};
        }
        
    };

    
// Controller for login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (password != user.password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Respond with a success message and token
        return res.status(200).json({
            message: 'User logged in',
            userId: user._id.toString(), // Convert ObjectId to string
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'An error occurred during login.', error: error.message });
    }
};

// Controller for Checking User 
const checkUser = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate the email input
         // Validate the userId format
         if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format.' });
        }
       
        // Find the user in the database by its id
        const user = await User.findOne({ userId });
        if (user) {
            // If user exists, return success response
            return res.status(200).json({ message: 'User exists in the system.'});
        } else {
            // If user does not exist, return not found response
            return res.status(404).json({ message: 'User not available' });
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return res.status(500).json({ message: 'An error occurred while checking user existence.', error: error.message });
    }
};
        


/* //Not in required Controllers
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
*/


//My latest addition: Assign a home to a user
// Assign an existing home to a user (if homeId is provided) 
// or Create a new home and assign it to the user (if no homeId is provided)
const assignHomeToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { homeId, home_name, address, floor_number } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.home_id) {
            return res.status(400).json({ message: 'User already has a home assigned' });
        }

        const Home = require('../models/Home');
        const Room = require('../models/Room');

        let home;
        let isNewHome = false;

        if (homeId) {
            // Assign existing home
            home = await Home.findById(homeId);
            if (!home) {
                return res.status(404).json({ message: 'Provided homeId does not exist' });
            }

            // Assign the user as owner if not already
            if (!home.owner_id) {
                home.owner_id = user._id;
                await home.save();
            }

        } else {
            // Create new home
            home = new Home({
                home_name: home_name || `${user.name}'s Home`,
                address: address || '',
                owner_id: user._id
            });

            await home.save();
            isNewHome = true;

            // Create default room
            const livingRoom = new Room({
                room_name: 'Living Room',
                home_id: home._id,
                floor_number: floor_number || 1
            });
            await livingRoom.save();
        }

        // Assign home to user
        user.home_id = home._id;
        await user.save();

        res.status(200).json({
            message: isNewHome ? 'New home created and assigned to user' : 'Existing home assigned to user',
            homeId: home._id,
            userId: user._id,
            home_name: home.home_name
        });
    } catch (error) {
        console.error('Error assigning home:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



module.exports = { registerUser,loginUser, checkUser, assignHomeToUser /*assignAdminRole*/ };

