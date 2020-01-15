const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const errorHandler = require('../helpers/errors.helper').errorHandler;

const Error=400;
const Ok=200;

const getTables = (req,res)=>{

    Table.find({}).then((tables)=>{
        res.status(200).json(tables);
    }).catch((err)=>{
        res.sendStatus(errorHandler(Error));
    });

}

const newTable = (req,res) =>{
    let table=new Table();

    table.tableCode=req.body.tableCode;
    table.seats=req.body.seats;
    console.log(table);

    table.save().then((item)=>{
        res.sendStatus(Ok);
    }).catch((err)=>{
        res.sendStatus(errorHandler(Error));
    });
}

const updateTable = (req,res)=>{
    Table.findOneAndUpdate({tableCode:req.params.tableCode},{clients:req.body.clients},{new:true}).then((table)=>{
        res.sendStatus(Ok);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(errorHandler(Error));
    });
}




module.exports={
   getTables,
   newTable,
   updateTable
}