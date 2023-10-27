const { Router } = require("express");
const userRouter = Router();

const User = require('../models/user');
const Thought = require('../models/thought');

userRouter.get('/', (req, res) => {
    User.find({}) // no need for a where clause as we simply want all users
    // returns an array of objects
    .then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error finding all users: ", error);
        res.status(400).json(error);
    });
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params; // req.params is an object that contains the parameters passed into the route

    User.findOne({ _id: id }) // returns an object
    .then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error finding user: ", error);
        res.status(400).json(error);
    });
});

userRouter.post('/', (req, res) => {
    const { username, email } = req.body;

    User.create(
        {username,
        email,
        thoughts: [],
        friends: [] // when a user is created, they do not have any thoughts or friends yet
        },
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error creating user: ", error);
        res.status(400).json(error);
    });
});

// this code, up to the post route, was inspired by the following video: https://youtu.be/E1w9kthC4YQ?si=UzMJ1r5x3R3ufF2p

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    User.findOneAndUpdate(
        { _id: id },
        {
            $set: req.body, // req.body will contain a username, an email, or both. in any case, we want to take the data from req.body and use it to update the user's information
        },
        { runValidators: true, new: true } // return the updated document
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error updating user: ", error);
        res.status(400).json(error);
    });
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    User.findOneAndDelete(
        { _id: id },
        { new: true }
    )
    .then((result) => {
        return Thought.deleteMany({ _id: { $in: result.thoughts }});
        /*
        result.thoughts is an array that contains the ids of all the thoughts associated with the user. the parameter of deleteMany() is:

        { _id: { $in: result.thoughts }}

        this means that deleteMany() will delete all thoughts whose ids are contained in the result.thoughts array.

        source for the $in operator: https://www.mongodb.com/docs/manual/reference/operator/query/in/
        */
    })
    .then((result) => {
        res.json("User has been deleted successfully.");
    }).catch((error) => {
        console.log("Error deleting user: ", error);
        res.status(400).json(error);
    });
});

// the put and delete routes were inspired by the following video: https://www.youtube.com/watch?v=cedhqsQ7FZs

userRouter.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            $addToSet: {
                friends: req.params.friendId // add the id of the friend to the user's friends array
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error adding friend to user: ", error);
        res.status(400).json(error);
    });
});

userRouter.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            $pull: {
                friends: req.params.friendId // remove the id of the friend from the user's friends array
            }
        },
        { new: true }
    ).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.log("Error removing friend from user: ", error);
        res.status(400).json(error);
    });
});

module.exports = userRouter;
