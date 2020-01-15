const express= require('express');
const kitchenOrderModel= require('../models/kitchenOrder.model');
const router = express.Router();
const controller = require('../controllers/kitchen');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/kitchen',controller.newOrder);

router.put('/kitchen/:id',controller.updateOrder);

router.get('/kitchen',controller.getOrders);

router.put('/kitchen',controller.checkOut);

module.exports=router;