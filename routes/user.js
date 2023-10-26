const { Router } = require("express");
const userRouter = Router();

const User = require('../models/user');

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
        res.json(result);
    }).catch((error) => {
        console.log("Error finding user: ", error);
        res.status(500).end(error);
    });
});

userRouter.post('/', (req, res) => {
    const { username, email, thoughts, friends } = req.body;

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

    User.findOneAndDelete(
        { _id: id },
        { new: true }
    )
    .then((result) => {
        res.json("User has been deleted successfully.");
    }).catch((error) => {
        console.log("Error deleting user: ", error);
        res.status(500).end(error);
    });
});
// BONUS: Remove a user's associated thoughts when deleted.

// the put and delete routes were informed by the following video: hhttps://www.youtube.com/watch?v=cedhqsQ7FZs

module.exports = userRouter;
