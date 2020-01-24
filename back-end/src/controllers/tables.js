const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const resHandler = require('../helpers/res.helper').resHandler;

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

    if(req.body.clients && req.body.seats){

        Table.findOneAndUpdate({tableCode:req.params.tableCode},{clients:req.body.clients,seats:req.body.seats},{new:true}).then((table)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.body.clients){
        Table.findOneAndUpdate({tableCode:req.params.tableCode},{clients:req.body.clients},{new:true}).then((table)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.body.seats){
        Table.findOneAndUpdate({tableCode:req.params.tableCode},{seats:req.body.seats},{new:true}).then((table)=>{
            res.status(200).json(resHandler(200));
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{
        res.status(400).json(resHandler(400));
    }
}

const deleteTable = (req,res)=>{
    Table.deleteOne({tableCode:req.params.tableCode}).then((table)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}




module.exports={
   getTables,
   newTable,
   updateTable,
   deleteTable
}