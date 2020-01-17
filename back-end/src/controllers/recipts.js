const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Recipt = mongoose.model('Recipt');
const resHandler = require('../helpers/res.helper').resHandler;

const Error=400;
const Ok=200;

const getRecipts = (req,res) =>{
    if(req.query && req.query.date){
        Recipt.find({date:req.query.date}).then((recipts)=>{
            res.status(200).json(recipts);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{

        Recipt.find({}).then((recipts)=>{
            res.status(200).json(recipts);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }
}

const newRecipt = (req,res) =>{
    let recipt=new Recipt();

    recipt.date=req.body.date;
    recipt.tableCode=req.body.tableCode;
    recipt.barItems=req.body.barItems;
    recipt.kitchenItems=req.body.kitchenItems;
    recipt.totalBar=req.body.totalBar;
    recipt.totalKitchen=req.body.totalKitchen;
    recipt.total=req.body.total;

    recipt.save().then((recipt)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}


module.exports={
    getRecipts,
    newRecipt
}