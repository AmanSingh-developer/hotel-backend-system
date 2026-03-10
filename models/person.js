const mongoose = require('mongoose');
const passport = require('passport');

//Define the person Schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required:true,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: Number,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true

    },
    address: {
        type: String,
        required: true,

    },
    username: {
        required: true,
        type:String
    },
    password: {
        required:true,
        type:String
    }
});


const person = mongoose.model('person' , personSchema);
module.exports = person;

