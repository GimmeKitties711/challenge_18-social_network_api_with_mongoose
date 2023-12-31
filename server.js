require("dotenv").config();
const express = require("express");

const userRouter = require("./routes/user");
const thoughtRouter = require("./routes/thought");
const connection = require("./config/connection");

const PORT = process.env.PORT || 3001;

const app = express(); // create an instance of express

app.use(express.json()); // use express.json() to parse the body of requests

app.use("/api/users", userRouter);
app.use("/api/thoughts", thoughtRouter);

connection.once("open", () => { // once() only allows an event to fire one time
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }); // app.listen() is inside connection.once() to prevent express from listening before the connection to mongoose is made
});

// this code was inspired by the following video: https://youtu.be/_ST946yIFSw?si=Lx0DSM51Bi52-NB-
