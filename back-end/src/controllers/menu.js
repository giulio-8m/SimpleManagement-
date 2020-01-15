const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const MenuItem = mongoose.model('MenuItem');
const errorHandler = require('../helpers/errors.helper').errorHandler;

const Error=400;
const Ok=200;

const getMenu = (req,res) =>{
    if(req.query.type){
        MenuItem.find({type:req.query.type}).then((items)=>{
            res.status(Ok).json(items);
        }).catch((err)=>{
            res.status(errorHandler(Error));
        });
    }else{

        MenuItem.find({}).then((menu)=>{
            res.status(Ok).json(menu);
        }).catch((err)=>{
            res.sendStatus(errorHandler(Error));
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
        res.sendStatus(Ok);
    }).catch((err)=>{
        res.sendStatus(errorHandler(Error));
    });
}


module.exports={
    getMenu,
    newItem,
}