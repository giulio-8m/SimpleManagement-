const express= require('express');
const kitchenOrderModel= require('../models/kitchenOrder.model');
const router = express.Router();
const controller = require('../controllers/kitchen');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/kitchen',auth,controller.newOrder);

router.put('/API/sm/kitchen/:id',auth,controller.updateOrder);

router.get('/API/sm/kitchen',auth,controller.getOrders);

router.patch('/API/sm/kitchen',auth,controller.updateStatus);

router.delete('/API/sm/kitchen/:id',auth,controller.deleteOrder);

module.exports=router;