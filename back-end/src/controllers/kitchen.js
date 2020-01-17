const passport = require('passport');
const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const KitchenOrder = mongoose.model('KitchenOrder');
const resHandler = require('../helpers/res.helper').resHandler;

const Error=400;
const Ok=200;

const getOrders = (req,res)=>{
    if(req.query.tableCode){
        KitchenOrder.find({tableCode:req.query.tableCode}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else if(req.query.status){
        KitchenOrder.find({status:req.query.status}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }else{
        KitchenOrder.find({}).then((orders)=>{
            res.status(200).json(orders);
        }).catch((err)=>{
            res.status(400).json(err);
        });
    }

}

const newOrder = (req,res) =>{
    let order=new KitchenOrder();

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

    KitchenOrder.findOneAndUpdate({_id:req.params.id},{status:req.body.status,progress:req.body.progress,items:req.body.items},{new:true}).then((order)=>{
        res.status(200).json(resHandler(200));
    }).catch((err)=>{
        res.status(400).json(err);
    });
}

const checkOut = (req,res)=>{
    KitchenOrder.updateMany({tableCode:req.query.tableCode},{status:"checked-out"}).then((orders)=>{
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