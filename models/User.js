const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name : {
        type: String,
        required : true
    },
    Id : {
        type : String,
        unique : true,
        required : true
    },
    Email : {
        type : String,
        unique : true,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Country : {
        type : String,
        required : true
    },
    MobileNumber : {
        type : Number,
        unique : true,
        required : true
    },
    DOB : {
        type : String
    }
})

const User = mongoose.model("user",userSchema);

module.exports = { User }
