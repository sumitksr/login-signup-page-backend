const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
app.use(express.json());

const connectDB = require('./config/database');
connectDB();

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome login page');
});