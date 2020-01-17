const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const resHandler = require('../helpers/res.helper').resHandler;

function generateJwt(user) {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    let token = {
      id: user._id,
      username: user.username,
      role: user.role,
      exp: parseInt(expiry.getTime() / 1000, 10)
    };
    return jwt.sign(token, process.env.JWT_SECRET, {algorithm: 'RS256'});
};

const signUp = (req,res)=>{

    let user=new User();
    user.username=req.body.username;
    user.setPassword(req.body.password);
    user.role=req.body.role;

    user.save().then((registered)=>{
       res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });

};

const signIn = (req,res)=>{
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            console.log("errore qui\n");    
            return res.status(401).json(err);
        }
        if (user) {
            token = generateJwt(user);
            return res.status(200).json(token);
        } else {
            return res.status(401).json(info);
        }
    })(req, res);
}

const getUsers = (req,res)=>{
    if(req.query.role){
        User.find({role:req.query.role}).then((users)=>{
            res.status(200).json(users);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{
        User.find({}).then((users)=>{
            res.status(200).json(users);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }
}

const updateUser = (req,res)=>{

    User.findOneAndUpdate({username:req.params.username},{jobs:req.body.jobs},{new:true}).then((user)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}

const deleteUser = (req,res)=>{
    User.deleteOne({username:req.params.username}).then((user)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}

module.exports={
    signIn,
    signUp,
    getUsers,
    updateUser,
    deleteUser
}