const bcrypt = require('bcrypt');
const User = require('../models/User.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
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
        const hashedPassword = await bcrypt.hash(password, process.env.N);
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
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if(!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const user = await User.findOne({ email: email });
        // check if user exists
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // check if password is correct
        // compare is used to check whether the provided password matches the hashed password in the database
        // bcrypt.compare() returns a promise that resolves to true if the passwords match, false otherwise
        const isPasswordValid = await bcrypt.compare(password, user.password);
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        if(!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid password' });
        }
        else{
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '24h' // Token will expire in 24 hour
            });
            user.token = token;
            user.password = undefined;
             user.save();
            // Set the token in a cookie
            const options ={
                expiresIn: new Date(Date.now() + 3*24 * 60 * 60 * 1000), // Token will expire in 3 days
                httpOnly: true, // Cookie is only accessible by the web server
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                message: 'Login successful',
                user,
            });
        }
        // send response
        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    }
    catch(error){
        console.log('Error during login:', error);
        res.status(400).json({ message: 'login failure' });
    }
}