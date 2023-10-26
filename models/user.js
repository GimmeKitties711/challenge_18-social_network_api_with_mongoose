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
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] // regex to validate email
        /*
        the regex used in match can be broken down as follows:
        /
        1) .+
        2) @
        3) .+
        4) \.
        5) .+
        /

        1) .+ matches any character one or more times
        2) @ matches the character @ literally
        3) .+ matches any character one or more times
        4) \. matches the character . literally
        5) .+ matches any character one or more times

        for example, orange@gmail.com would be a valid email address
        source: https://regex101.com/
        */
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
},
{
    toJSON: {
        virtuals: true, // enable virtuals
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
// source for how to use virtuals in mongoose: https://mongoosejs.com/docs/tutorials/virtuals.html

const userModel = mongoose.model('user', userSchema); // create a model from the user schema

module.exports = userModel;

/*
this code was informed by the following videos:

1. https://youtu.be/_ST946yIFSw?si=Lx0DSM51Bi52-NB-
2. https://www.youtube.com/watch?v=cedhqsQ7FZs
*/
