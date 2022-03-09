const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    ID : {
        type: String
    },
    SenderName : {
        type : String
    },
    Sender : {
        type: String
    },
    Receiver : {
        type : String
    },
    Message : {
        type : String
    },
    MsgType : {
        type : String
    },
    Status : {
        type : String
    },
    TimeStamp : {
        type : String
    },
    Image : {
        type : String
    }
})


module.exports = { MessageSchema }


