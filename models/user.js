const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true // removes whitespace from both ends of a string
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // match: // regex to validate email
    },
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

/*
this code was informed by the following videos:

1. https://youtu.be/_ST946yIFSw?si=Lx0DSM51Bi52-NB-
2. https://www.youtube.com/watch?v=cedhqsQ7FZs
*/
