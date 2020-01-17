const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const BarOrder = mongoose.model('BarOrder');
const resHandler = require('../helpers/res.helper').handler;

const Error=400;
const Ok=200;

const getOrders = (req,res)=>{
    if(req.query.tableCode){
        BarOrder.find({tableCode:req.query.tableCode}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.query.status){
        BarOrder.find({status:req.query.status}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{
        BarOrder.find({}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
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
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });

}

const updateOrder = (req,res)=>{
    BarOrder.findOneAndUpdate({_id:req.params.id},{status:req.body.status,progress:req.body.progress,items:req.body.items},{new:true}).then((order)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}

const checkOut = (req,res)=>{
    BarOrder.updateMany({tableCode:req.query.tableCode},{status:"checked-out"}).then((orders)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}


module.exports={
   getOrders,
   newOrder,
   updateOrder,
   checkOut
}