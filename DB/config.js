console.log("Mongo DB Configuring starts...");
var config = module.exports;
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
console.log(process.env.DB);
mongoose.Promise = global.Promise;

var ok = mongoose.connect(process.env.DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
},function(error, success){
    if(success)
    {
        console.log("Mongo DB Successfully configured!");
    }
    else
    {
        console.log("Mongo DB Connection Problem ", error)
    }
})
