const { Router } = require("express");
const thoughtRouter = Router();

const Thought = require('../models/thought');
const User = require('../models/user');

thoughtRouter.get('/', (req, res) => {
    Thought.find({})
    .then((result) => { // this is called a callback function
        res.json(result);
    }).catch((error) => {
        console.log("Error finding all thoughts: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    Thought.findOne({ _id: id })
    .then((result) => {
        res.json(result);
    })
    .catch((error) => {
        console.log("Error finding thought: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.post('/', (req, res) => {
    // create a thought, then add the thought to the user's thoughts array
    Thought.create(req.body).then((result) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    thoughts: result._id
                    // add the id of the newly created thought to the user's thoughts array
                }
            },
            { runValidators: true, new: true }
        ) // User.findOneAndUpdate() is being returned so that it can be passed into the next .then()
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error creating thought: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    Thought.findOneAndUpdate(
        { _id: id },
        {
            $set: req.body, // req.body will contain thoughtText, a username, or both. in any case, we want to take the data from req.body and use it to update the thought's information
        },
        { runValidators: true, new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error updating thought: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Thought.findOneAndDelete(
        { _id: id },
        { new: true }
    ).then((result) => {
        res.json("Thought has been deleted successfully.");
    }).catch((error) => {
        console.log("Error deleting thought: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
            $addToSet: {
                reactions: req.body // req.body will contain a reactionBody and a username. this line of code adds the reaction to the reactions array of the thought associated with thoughtId.
            }
        },
        { runValidators: true, new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error adding reaction to thought: ", error);
        res.status(400).json(error);
    });
});

thoughtRouter.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
            $pull: {
                reactions: {
                    reactionId: req.params.reactionId // from the reactions array, remove the reaction whose reactionId matches req.params.reactionId
                }
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error deleting reaction from thought: ", error);
        res.status(400).json(error);
    });
});

module.exports = thoughtRouter;
