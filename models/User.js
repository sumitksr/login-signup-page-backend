const moongoose = require('mongoose');
const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {

        type: String,
        // mtlb input mai yeh sirf yahi tin chize lega
        enum: ['student', 'admin','visitor'],
        default: 'user',
    },
}, { timestamps: true });
module.exports = moongoose.model('user', userSchema);