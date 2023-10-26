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
        res.status(500).end(error);
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
        res.status(500).end(error);
    });
});

thoughtRouter.post('/', (req, res) => {
    // create a thought
    // add the thought to the user's thoughts array field
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
        )
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error creating thought: ", error);
        res.status(500).end(error);
    });
});

thoughtRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    Thought.findOneAndUpdate(
        { _id: id },
        {
            $set: req.body,
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error updating thought: ", error);
        res.status(500).end(error);
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
        res.status(500).end(error);
    });
});

thoughtRouter.post('/:thoughtId/reactions', (req, res) => {

    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
            $addToSet: {
                reactions: req.body
            }
        },
        { runValidators: true, new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error adding reaction to thought: ", error);
        res.status(500).end(error);
    });
});

thoughtRouter.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
            $pull: {
                reactions: {
                    reactionId: req.params.reactionId
                }
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error deleting reaction from thought: ", error);
        res.status(500).end(error);
    });
});

module.exports = thoughtRouter;
