const express= require('express');
const barOrderModel= require('../models/barOrder.model');
const router = express.Router();
const controller = require('../controllers/bar');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/bar',controller.newOrder);

router.put('/bar/:id',controller.updateOrder);

router.get('/bar',controller.getOrders);

router.put('/bar',controller.checkOut);


module.exports=router;