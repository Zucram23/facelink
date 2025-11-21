const mongoose = require('mongoose');
const user = require('./user');
const postSchema = new mongoose.Schema({

    content:{
        type: String,
        required: [true, 'Content field cannot be enmpty'],
        trim: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: [true, 'Posts require a timestamp']
    }

});
module.exports = mongoose.model('post', postSchema);

