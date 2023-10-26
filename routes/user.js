const { Router } = require("express");
const userRouter = Router();

const User = require('../models/user');
const Thought = require('../models/thought');

userRouter.get('/', (req, res) => {
    User.find({}) // no need for where clause as we simply want all users
    // returns an array of objects
    .then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error finding all users: ", error);
        res.status(500).end(error);
    });
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findOne({ _id: id }) // returns an object
    .then((result) => {
        console.log('important thingy: ', result.username)
        res.json(result);
    }).catch((error) => {
        console.log("Error finding user: ", error);
        res.status(500).end(error);
    });
});

userRouter.post('/', (req, res) => {
    const { username, email } = req.body;

    User.create({
        username,
        email,
        thoughts: [],
        friends: []
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error creating user: ", error);
        res.status(500).end(error);
    });
});

// this code, up to the post route, was informed by the following video: https://youtu.be/E1w9kthC4YQ?si=UzMJ1r5x3R3ufF2p

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    User.findOneAndUpdate(
        { _id: id },
        {
            $set: req.body,
        },
        { new: true } // return the updated document
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error updating user: ", error);
        res.status(500).end(error);
    });
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('thingy1: ', id)

    User.findOneAndDelete(
        { _id: id },
        { new: true }
    )
    .then((result) => {
        console.log('thingy2: ', result);
        Thought.deleteMany({ username: result.username });
    })
    .then((result) => {
        res.json("User has been deleted successfully.");
    }).catch((error) => {
        console.log("Error deleting user: ", error);
        res.status(500).end(error);
    });
});
// BONUS: Remove a user's associated thoughts when deleted.

// the put and delete routes were informed by the following video: hhttps://www.youtube.com/watch?v=cedhqsQ7FZs

userRouter.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            $addToSet: {
                friends: req.params.friendId
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error adding friend to user: ", error);
        res.status(500).end(error);
    });
});

userRouter.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            $pull: {
                friends: req.params.friendId
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error removing friend from user: ", error);
        res.status(500).end(error);
    });
})

module.exports = userRouter;
