var express = require('express');
var { User } = require('../models/User')
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registering User
router.post('/register', async function(req, res, next) {
  bcrypt.genSalt(13, function(err,salt){
      if(err){
          return;
      };
      if(salt){
          bcrypt.hash(req.body.Password, salt, function(err1, hash){
              if(err1){
                  return;
              }
              if(hash){
                  req.body.Password = hash;
                  savedata();
              }
          })
      }
  })
  async function savedata(){
      try{
          let user = new User(req.body)
          await user.save();
          return res.status(200).json({
              ok : true
          })
      }catch(err){
          console.log(err);
          if(err.keyPattern != null || err.keyPattern != undefined)
          {
              var data = Object.keys(err.keyPattern);
          }
          
          return res.status(500).json({
              ok : false,
              reason : data[0]
          })
      }
  }
});


/* Login user */
router.post('/login', async function(req, res, next) {
    var userid = req.body.Loginid;
    var pass = req.body.Password;

    try{

        var data = await User.findOne({Email:userid})

        if(data == null)
        {
            data = await User.findOne({Id:userid})
        }
        if(data == null)
        {
            data = await User.findOne({MobileNumber:userid})
        }
    } catch(err){}
    if(data == null)
    {
        res.status(500).json({
            ok : false,
            reason : "wrong"
        })
        return;
    }
    bcrypt.compare(pass, data.Password, function(err, ok){
        if(err)
        {
            res.status(500).json({
                ok : false,
                reason : 'tryagain'
            })
            return;
        }
        else{
            if(ok){
                data.Password = null;
                let token = jwt.sign({
                    _id: data._id,
                    Email : data.Email,
                    Name : data.Name,
                    MobileNumber : data.MobileNumber
                },process.env.SECRET,{})
                res.status(200).json({
                    ok : true,
                    token : token,
                    UserData : data
                })
                return;
            }
            else{
                res.status(500).json({
                    ok : false,
                    reason : "wrong"
                })
                return;
            }
        }
    })
});

module.exports = router;
