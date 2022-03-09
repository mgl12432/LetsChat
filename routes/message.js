var express = require('express');
const { MessageSchema } = require('../models/Message');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var router = express.Router();


/* GET users message */
router.post('/get',  async function(req, res, next) {
    jwt.verify(req.body.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
        }
        if(decoded)
        {
            try{
                const Message = mongoose.model(req.body.id+"message",MessageSchema);
                var data = await Message.find();

                res.status(200).json({
                    ok : true,
                    Data : data
                })
                
            } catch(err){
                res.status(500).json({
                    ok : false
                })
            }
        }
    });
    
});

/* GET users message */
router.post('/delete',  async function(req, res, next) {
    jwt.verify(req.body.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
            res.status(500).json({
                ok : false
            })
        }
        if(decoded)
        {
            try{
                const Message = mongoose.model(req.body.id+"message",MessageSchema);
                var data = await Message.remove();

                res.status(200).json({
                    ok : true
                })
                
            } catch(err){
                console.log(err);
                res.status(500).json({
                    ok : false
                })
            }
        }
    });
    
});

module.exports = router;