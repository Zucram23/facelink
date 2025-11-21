const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        default: []
    }]
}, {
    timestamps: true,
})
module.exports = mongoose.model('user', userSchema);