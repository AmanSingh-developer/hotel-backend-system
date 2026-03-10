const mongoose = require("mongoose");
require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL =process.env.MONGODB_URL;
mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () =>{
    console.log("connected to MongoDb Server");
});

db.on('error', (err) =>{
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () =>{
    console.log("Disconnected");
})

module.exports = db;