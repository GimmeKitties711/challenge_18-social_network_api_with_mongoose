const mongoose = require("mongoose"); // import mongoose

const connectionString = process.env.MONGODB_URL; // take the connection string from the environment variable

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // standard connection settings
});

module.exports = mongoose.connection; // export the connection

// this code was informed by the following video: https://youtu.be/_ST946yIFSw?si=Lx0DSM51Bi52-NB-
