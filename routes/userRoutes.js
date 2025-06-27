const express = require('express');
const router = express.Router();
const {login, signup}=require('../controllers/Auth.js');
const {auth,isAdmin,isStudent} = require('../middlewares/auth.js');

router.post('/login', login);
router.post('/signup', signup);
router.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({ message: 'Welcome Student' });
});
router.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});
module.exports = router;