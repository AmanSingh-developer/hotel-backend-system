const mongoose = require("mongoose");

const mongoURL = 'mongodb://localhost:27017/hotels'
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