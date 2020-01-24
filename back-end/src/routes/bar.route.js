const express= require('express');
const barOrderModel= require('../models/barOrder.model');
const router = express.Router();
const controller = require('../controllers/bar');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/bar',auth,controller.newOrder);

router.put('/API/sm/bar/:id',auth,controller.updateOrder);

router.get('/API/sm/bar',auth,controller.getOrders);

router.put('/API/sm/bar',auth,controller.checkOut);


module.exports=router;