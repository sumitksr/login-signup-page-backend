const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => { 
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
};

module.exports = connectDB;
