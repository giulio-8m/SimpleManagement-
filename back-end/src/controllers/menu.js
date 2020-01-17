const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const MenuItem = mongoose.model('MenuItem');
const resHandler = require('../helpers/res.helper').resHandler;

const Error=400;
const Ok=200;

const getMenu = (req,res) =>{
    if(req.query.type){
        MenuItem.find({type:req.query.type}).then((items)=>{
            res.status(200).json(items);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{

        MenuItem.find({}).then((items)=>{
            res.status(200).json(items);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }
}

const newItem = (req,res) =>{
    let item=new MenuItem();

    item.name=req.body.name;
    item.type=req.body.type;
    item.price=req.body.price;
    item.time=req.body.time;

    item.save().then((item)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}


module.exports={
    getMenu,
    newItem,
}