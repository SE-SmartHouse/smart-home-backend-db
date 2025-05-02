const SensorData = require('../models/SensorData');
const Device = require('../models/Device');

// POST: Receive temperature data
const submitReading = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { reading, unit } = req.body;

        const device = await Device.findById(deviceId);
        if (!device || device.device_type !== 'reading_sensor') {
            return res.status(400).json({ message: 'Invalid device or not a Reading sensor' });
        }

        const entry = new SensorData({
            device_id: deviceId,
            reading,
            unit
        });

        await entry.save();

        res.status(201).json({ message: 'Reading recorded', data: entry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save Reading', error: error.message });
    }
};

// GET: Return latest reading
const getLatestReading = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const latest = await SensorData.findOne({ device_id: deviceId })
            .sort({ timestamp: -1 });

        if (!latest) {
            return res.status(404).json({ message: 'No data found' });
        }

        res.status(200).json(latest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Reading', error: error.message });
    }
};

module.exports = { submitReading, getLatestReading };
