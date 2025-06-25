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
        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        // send response
        res.status(201).json({ message: 'User created successfully', user });

    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }  
}
exports.login = async (req, res) => {
    try{ 
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        // check if user exists
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // send response
        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    }
    catch(error){
        console.error('The user not Already exists ');
        res.status(400).json({ message: 'User not exists , create a new user using signup page ' });
    }
}