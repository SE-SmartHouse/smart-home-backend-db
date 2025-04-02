const mongoose = require('mongoose');
const User = require('../models/User');
const Home = require('../models/Home');
const Device = require('../models/Device');
const Room = require('../models/Room');

// Get device info
const deviceInfo = async (req, res) => {
    try {
        const { deviceId } = req.params;

        // Finding the device by its _id
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        // Response formating
        const deviceInfo = {
            id: device._id.toString(), // Convert ObjectId to string
            device_name: device.device_name,
            status: device.status,
        };

        res.status(200).json(deviceInfo);
    } catch (error) {
        console.error('Error in getDeviceInfo:', error);
        res.status(500).json({ message: 'Error fetching device info', error: error.message });
    }
};

// Change device status 
const controlDevice = async (req, res) => {
    try {
        const { deviceId } = req.params; // Get deviceId from path
        const { status } = req.body;     // Get status from body

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const result = await Device.collection.updateOne(
            { _id: new mongoose.Types.ObjectId(deviceId) },
            { $set: { status: status } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }

        res.status(200).json({ message: 'Status changed' });
    } catch (error) {
        console.error('Error in controlDevice:', error);
        res.status(500).json({ message: 'Error changing device status', error: error.message });
    }
};

/*
// Get all devices in user's home
const getHomeDevices = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const devices = await Device.find({ home_id: user.home_id }).populate('room_id');
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
}; 
// Change device room
const changeDeviceRoom = async (req, res) => {
    try {
        const { userId, deviceId, roomId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const device = await Device.findOne({ _id: deviceId, home_id: user.home_id });
        if (!device) {
            return res.status(404).json({ message: 'Device not found or not in your home' });
        }

        const room = await Room.findOne({ _id: roomId, home_id: user.home_id });
        if (!room) {
            return res.status(404).json({ message: 'Room not found or not in your home' });
        }

        device.room_id = roomId;
        await device.save();

        res.status(200).json({ message: 'Device room updated', device });
    } catch (error) {
        res.status(500).json({ message: 'Error changing device room', error: error.message });
    }
};
*/

module.exports = { /*changeDeviceRoom, /*getHomeDevices,*/ controlDevice ,deviceInfo };