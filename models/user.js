const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // userSchema.virtual('friendCount').get(function() {
    //     return this.friends.length;
    // });
});

const userModel = mongoose.model('user', userSchema); // create a model from the user schema

module.exports = userModel;
