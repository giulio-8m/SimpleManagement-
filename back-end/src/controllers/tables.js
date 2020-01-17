const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const resHandler = require('../helpers/res.helper').resHandler;

const Error=400;
const Ok=200;

const getTables = (req,res)=>{

    Table.find({}).then((tables)=>{
        res.status(200).json(tables);
    }).catch((err)=>{
        res.status(400).json(err);
    });

}

const newTable = (req,res) =>{
    let table=new Table();

    table.tableCode=req.body.tableCode;
    table.seats=req.body.seats;

    table.save().then((table)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}

const updateTable = (req,res)=>{
    Table.findOneAndUpdate({tableCode:req.params.tableCode},{clients:req.body.clients},{new:true}).then((table)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}




module.exports={
   getTables,
   newTable,
   updateTable
}