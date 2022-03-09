var express = require('express');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MessageSchema } = require('../models/Message');
const { json } = require('body-parser');
var app = express();
var PORT = "3434";

const server = app.listen(PORT);

app.use(express.static('public'));
console.log('Chat server running on '+PORT);
const io = socket(server);


io.on("connection", (socket) => {
    console.log("New Connection Added : "+socket.id);

    socket.on(socket.id, () => {
        console.log("I listened");
        setTimeout(() => {
            console.log("Call me");
            io.emit(socket.id, "Call me");
        }, 3400);
        
       
    })

    socket.on('DotTechBWChAtSyStEm', (Data)=> {
        console.log("Listened : "+Data, Data.CryptedData);
        jwt.verify(Data.token,process.env.SECRET,function(err,decoded){
            if(err)
            {
                console.log(" error showing ",err);
            }
            if(decoded)
            {
                if (Data && Data.Operation && Data.Operation === "typing") {
                    console.log("typing to : "+Data.Receiver);
                    var emit = io.emit(Data.Receiver, Data);
                }
                else if( Data && Data.Operation && Data.Operation === "delete") {
                    deleteReceivedOne(Data.Receiver, Data.ID);
                }
                else if(Data.Status && (Data.Status === "yellow")) {
                    Data.CryptedData['SenderName'] = decoded.Name
                    console.log("sending to : "+ Data.Receiver)
                    var emit = io.emit(Data.Receiver, Data.CryptedData);
                    console.log(emit);
                    let save = storeDB(Data);
                    deleteRedOne(Data.Receiver,Data.ID);
                }
                else if (Data.Status && (Data.Status === "green")) {
                    Data.CryptedData['SenderName'] = decoded.Name
                    console.log("sending to : "+ Data.Receiver)
                    var emit = io.emit(Data.Receiver, Data.CryptedData);
                    console.log(emit);
                    let save = storeDB(Data);
                    deleteYellowOne(Data.Receiver,Data.ID);
                    deleteGreenOne(Data.Receiver,Data.ID);
                }
                else {
                    let save = storeDB(Data);
                    Data.CryptedData['SenderName'] = decoded.Name
                    console.log("sending to : "+ Data.Receiver)
                    var emit = io.emit(Data.Receiver, Data.CryptedData);
                    console.log(emit);
                }
                
            }
        });
        
    })
})

async function storeDB (Data) {
    const Message = mongoose.model(Data.Receiver+"message",MessageSchema);
    JsonMessage = {}
    JsonMessage.ID = Data.CryptedData.ID
    JsonMessage.SenderName = Data.CryptedData.SenderName
    JsonMessage.Sender = Data.CryptedData.Sender
    JsonMessage.Receiver =Data.CryptedData.Receiver
    JsonMessage.Message =Data.CryptedData.Message
    JsonMessage.MsgType =Data.CryptedData.MsgType
    JsonMessage.Status =Data.CryptedData.Status
    JsonMessage.TimeStamp =Data.CryptedData.TimeStamp
    JsonMessage.Image = null
    let message = new Message(JsonMessage);
    return await message.save();
}

async function deleteRedOne (userid, msgid) {
    const Message = mongoose.model(userid+"message",MessageSchema);

    try {
        await Message.deleteOne({"ID" : msgid, "Status" : "red"}).then(function(ok){
            console.log(ok);
        });
        console.log("red done ");
    } catch (error) {
        console.log(error);
    }
}

async function deleteYellowOne (userid, msgid) {
    const Message = mongoose.model(userid+"message",MessageSchema);

    try {
        await Message.deleteOne({"ID" : msgid, "Status" : "red"}).then(function(ok){
            console.log(ok);
        });
        console.log("red done ");
        await Message.deleteOne({"ID" : msgid, "Status" : "yellow"}).then(function(ok){
            console.log(ok);
        });;
    
        console.log("Yellow done");
    } catch (error) {
        console.log(error);
    }
}

async function deleteGreenOne(userid, msgid) {
    const Message = mongoose.model(userid+"message",MessageSchema);
    try {
        await Message.deleteOne({"ID" : msgid, "Status" : "green"}).then(function(ok){
            console.log(ok);
        });;
    } catch (error) {
        console.log(error);
    }
    console.log("Green done");
}

async function deleteReceivedOne(userid, msgid) {
    const Message = mongoose.model(userid+"message",MessageSchema);
    try {
        await Message.deleteOne({"ID" : msgid, "Status" : "red"}).then(function(ok){
            console.log(ok);
        });;
    } catch (error) {
        console.log(error);
    }
    console.log("Received one is Deletion done");
}