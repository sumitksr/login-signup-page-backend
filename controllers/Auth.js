const bcrypt = require('bcrypt');
const User = require('../models/User.js');


exports.signup = async (req, res) => {
    try{
        // get data
        const { name, email, password, role } = req.body;
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 15);

    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }  
}