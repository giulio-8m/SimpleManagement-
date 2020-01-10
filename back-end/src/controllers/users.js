const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const errorHandler = require('../helpers/errors.helper').errorHandler;

function generateJwt(user) {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1); //FIXME: at the moment the token expires in 1 days. A bit too much
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
       res.sendStatus(200);
    }).catch(errorHandler(err));

};

const signIn = (req,res)=>{
    passport.authenticate('local').then((user)=>{
        let token=generateJwt(user);
        res.status(200).json(token);
    }).catch(errorHandler(err));
}

const getUsers = (req,res)=>[
    User.find({}).then((users)=>{
       return res.status(200).json(users);
    }).catch((err)=>{
       return res.status(errorHandler(err));
    })
]

module.exports={
    signIn,
    signUp,
    getUsers
}