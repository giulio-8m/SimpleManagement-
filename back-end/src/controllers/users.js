const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const resHandler = require('../helpers/res.helper').resHandler;

function generateJwt(user) {
    let token = {
      id: user._id,
      username: user.username,
      role: user.role,
      jobs:user.jobs,
    };
    return jwt.sign(token, process.env.JWT_SECRET, {algorithm: 'RS256', expiresIn: '8h' });
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

    if(req.body.jobs && req.body.role){
        User.findOneAndUpdate({username:req.params.username},{jobs:req.body.jobs,role:req.body.role},{new:true}).then((user)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.body.role){
        User.findOneAndUpdate({username:req.params.username},{role:req.body.role},{new:true}).then((user)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.body.jobs){
        User.findOneAndUpdate({username:req.params.username},{jobs:req.body.jobs},{new:true}).then((user)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{
        res.status(400).json(resHandler(400));
    }
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