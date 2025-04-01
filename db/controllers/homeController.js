const mongoose = require('mongoose');
const Home = require('../models/Home');
const Device = require('../models/Device');

// Generate a new homeId
const generateHomeId = async (req, res) => {
    try {
        const home = new Home({
            home_name: `Home-${new mongoose.Types.ObjectId().toString().slice(-6)}`, // Temporary name
        });
        await home.save();
        res.status(201).json({ homeId: home._id });
    } catch (error) {
        res.status(500).json({ message: 'Error generating homeId', error: error.message });
    }
};

// Save devices under a homeId
const saveHomeDevices = async (req, res) => {
    try {
        const { homeId, devices } = req.body;
        if (!homeId || !devices || !Array.isArray(devices)) {
            return res.status(400).json({ message: 'homeId and devices array are required' });
        }

        const home = await Home.findById(homeId);
        if (!home) {
            return res.status(404).json({ message: 'Home not found' });
        }

        const devicePromises = devices.map(async (deviceData) => {
            const { device_name, device_type, status } = deviceData;
            if (!device_name || !device_type) {
                throw new Error('device_name and device_type are required');
            }
            const device = new Device({
                device_name,
                device_type,
                home_id: homeId,
                status: status || 'Off',
            });
            await device.save();
            return device._id;
        });

        await Promise.all(devicePromises);
        res.status(200).json({ message: 'Devices saved successfully', homeId });
    } catch (error) {
        res.status(500).json({ message: 'Error saving devices', error: error.message });
    }
};

module.exports = { generateHomeId, saveHomeDevices };