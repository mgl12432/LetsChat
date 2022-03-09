var express = require('express');
var { User } = require('../models/User')
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* Get user  Data */
router.post('/getUserData', async function(req, res, next) {

    var data;

    jwt.verify(req.body.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
        }
        if(decoded)
        {
            try{
                console.log(req.body);
                data = await User.findOne({_id:req.body._id},{Password:0})
                if(data == null)
                {
                    console.log(data);
                    res.status(500).json({
                        ok : false,
                        reason : "wrong"
                    })
                    return;
                }
                res.status(200).json({
                    ok : true,
                    data : data
                })
            } catch(err){
                console.log(err);
            }
            
        }
    });
    
});


router.post('/setdp', function(req, res) {
	console.log(req.files.image.originalFilename);
	console.log(req.files.image.path);
    
    fs.readFile(req.files.image.path, function (err, data) {
        var dirname = "/public/DP";
        var newPath = dirname + "" + 	req.files.image.originalFilename;
        fs.writeFile(newPath, data, function (err) {
            if(err) {
                res.json({'response':"Error"});
            } 
            else {
                res.json({'response':"Saved"});
            }
        });
    });
});

module.exports = router;