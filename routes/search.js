var express = require('express');
var { User } = require('../models/User')
var router = express.Router();

/* GET users listing. */
router.post('/user',  async function(req, res, next) {
    var search = req.body.user;
    try{
        var data = await User.find({
            "$or": [{
                Name: {'$regex':'(\s+'+search+'|^'+search+')', $options: 'i'}
            },{
                Email: {'$regex':'(\s+'+search+'|^'+search+')', $options: 'i'}
            },{
                MobileNumber: {'$regex':'(\s+'+search+'|^'+search+')'}
            },{
                Id: {'$regex':'(\s+'+search+'|^'+search+')', $options: 'i'}
            }]
        }, {Password :0})  

        res.status(200).json({
            ok : true,
            Data : data
        })
        
    } catch(err){
        res.status(500).json({
            ok : false
        })
    }
});

module.exports = router;
