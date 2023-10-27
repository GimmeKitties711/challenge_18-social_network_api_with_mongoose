const mongoose = require("mongoose");

function formatDate(date) {
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return `${date.toLocaleDateString(undefined, options)} at ${date.toLocaleTimeString()}`;
    // undefined means use the default locale
    // example: October 25, 2023 at 8:47:48 PM
    // note: my timezone is PDT. your results may vary if your timezone is different.

    // source for toLocaleDateString(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // source for toLocaleTimeString(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
}

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1, // added because it does not make sense to allow an empty reaction
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    }
},
{
    toJSON: {
        getters: true // enable getters
    },
    id: false
});
// source for how to use getter functions in Mongoose: https://mongoosejs.com/docs/tutorials/getters-setters.html

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const thoughtModel = mongoose.model('thought', thoughtSchema);

module.exports = thoughtModel;
