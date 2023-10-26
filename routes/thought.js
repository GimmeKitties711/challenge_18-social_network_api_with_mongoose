const { Router } = require("express");
const thoughtRouter = Router();

const Thought = require('../models/thought');
const User = require('../models/user');

thoughtRouter.get('/', (req, res) => {
    Thought.find({})
    .then((result) => { // this is called a callback function
        res.json(result);
    }).catch((error) => {
        res.status(500).end(error);
    });
});

thoughtRouter.get('/:id', (req, res) => {

});

thoughtRouter.post('/', (req, res) => {
    // create a thought
    // add the thought to the user's thoughts array field
    // in the body
    // $addToSet: {
    //     { }
    // }
    Thought.create(req.body).then((result) => {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            {
                $addToSet: {
                    thoughts: result._id
                }
            },
            { runValidators: true, new: true }
        )
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).end(error);
    });
})

module.exports = thoughtRouter;
