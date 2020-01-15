const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Recipt = mongoose.model('Recipt');
const errorHandler = require('../helpers/errors.helper').errorHandler;

const Error=400;
const Ok=200;

const getRecipts = (req,res) =>{
    if(req.query && req.query.date){
        Recipt.find({date:req.query.date}).then((recipts)=>{
            res.status(Ok).json(recipts);
        }).catch((err)=>{
            res.status(errorHandler(Error));
        });
    }else{

        Recipt.find({}).then((recipts)=>{
            res.status(Ok).json(recipts);
        }).catch((err)=>{
            res.status(errorHandler(Error));
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
        res.sendStatus(Ok);
    }).catch((err)=>{
        res.sendStatus(errorHandler(Error));
    });
}


module.exports={
    getRecipts,
    newRecipt
}