var express = require('express');
var { User } = require('../models/User')
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')

// Uploading image using multer

const PATH = './routes/images/profile';
const filename =""
let filedata

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        filedata = file
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }); 

  let upload = multer({
    storage: storage
  });


router.post('/dpimg',upload.single('image'),function(req,res,next){
    jwt.verify(req.body.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
        }
        if(decoded)
        {
        try{
            if (!req.file) {
                return res.status(500).json({
                    Pic : false
                })
            
            } else {
                var data = await User.findOne({_id:filedata.originalname})
                if(data != null)
                {
                    data = await User.updateOne({_id:filedata.originalname},{DP:filedata.originalname});
                    if(data != null) {
                        return res.status(200).json({
                            Pic : filedata.originalname
                        })
                    }
                    else {
                        return res.status(500).json({
                            Pic : false
                        })
                    }
                }
            }
        }catch(err){
            return res.status(500).json({
                Pic : false
            })
        }   
    }
})
})

// Get my DP pic
router.get('/getDpImg/:token', async function(req,res,next) {
    jwt.verify(req.params.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
        }
        if(decoded)
        {
            id = decoded._id;
            console.log(__dirname, decoded);
            return res.status(200).sendFile(__dirname+'/images/profile/'+id);
        }
    })
})

// Get others DP pic
router.get('/getODpImg/:token/:id', async function(req,res,next) {
    jwt.verify(req.params.token,process.env.SECRET,async function(err,decoded){
        if(err)
        {
            console.log(" error showing ",err);
        }
        if(decoded)
        {
            id = req.params.id;
            console.log(id);
            return res.status(200).sendFile(__dirname+'/images/profile/'+req.params.id);
        }
    })
})

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
