const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const BarOrder = mongoose.model('BarOrder');
const errorHandler = require('../helpers/errors.helper').errorHandler;

const Error=400;
const Ok=200;

const getOrders = (req,res)=>{
    if(req.query.tableCode){
        BarOrder.find({tableCode:req.query.tableCode}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.sendStatus(errorHandler(Error));
        });
    }
    else if(req.query.status){
        BarOrder.find({status:req.query.status}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.sendStatus(errorHandler(Error));
        });
    }else{
        BarOrder.find({}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.sendStatus(errorHandler(Error));
        });
    }

}

const newOrder = (req,res) =>{
   let order=new BarOrder();

   order.tableCode=req.body.tableCode;
   order.waiter=req.body.waiter;
   order.clients=req.body.clients;
   order.items=req.body.items;
   order.date=req.body.date;

   order.save().then((doc)=>{
        res.sendStatus(200);
   }).catch((err)=>{
       res.sendStatus(errorHandler(Error));
   });

}

const updateOrder = (req,res)=>{
    BarOrder.findOneAndUpdate({_id:req.params.id},{status:req.body.status,progress:req.body.progress,items:req.body.items},{new:true}).then((order)=>{
        res.sendStatus(Ok);
    }).catch((err)=>{
        res.sendStatus(errorHandler(Error));
    });
}

const checkOut = (req,res)=>{
    BarOrder.updateMany({tableCode:req.query.tableCode},{status:"checked-out"}).then((orders)=>{
        res.sendStatus(Ok);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(errorHandler(Error));
    })
}


module.exports={
   getOrders,
   newOrder,
   updateOrder,
   checkOut
}