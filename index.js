require('dotenv').config();
const express = require('express');
const connectDB = require('./db/config/db');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api', homeRoutes);
app.use('/api', userRoutes);
app.use('/api', deviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));