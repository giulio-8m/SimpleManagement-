const express= require('express');
const barOrderModel= require('../models/barOrder.model');
const router = express.Router();
const controller = require('../controllers/bar');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/bar',auth,controller.newOrder);

router.put('/API/sm/bar/:id',auth,controller.updateOrder);

router.get('/API/sm/bar',auth,controller.getOrders);

router.patch('/API/sm/bar',auth,controller.updateStatus);

router.delete('/API/sm/bar/:id',auth,controller.getOrders);

module.exports=router;