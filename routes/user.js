const { Router } = require("express");
const userRouter = Router();
const { ObjectId } = require("mongodb");

const User = require('../models/user');

userRouter.get('/', (req, res) => {
    User.find({}) // no need for where clause as we simply want all users
    // returns an array of objects
    .then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error finding all users: ", error);
        res.status(500).end(error);
    })
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params.id;
    User.findOne({ _id: new ObjectId(id) }) // returns an object
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
        thoughts,
        friends
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error creating user: ", error);
        res.status(500).end(error);
    });
});

// this code, up to the post route, was informed by the following video: https://youtu.be/E1w9kthC4YQ?si=UzMJ1r5x3R3ufF2p

userRouter.put('/:id', (req, res) => {
    res.send('Hello World!');
});

userRouter.delete('/:id', (req, res) => {
    res.send('Hello World!');
});
// BONUS: Remove a user's associated thoughts when deleted.

module.exports = userRouter;
