const express= require('express');
const reciptModel= require('../models/recipt.model');
const router = express.Router();
const controller = require('../controllers/recipts');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/recipts',auth,controller.newRecipt);

router.get('/API/sm/recipts',auth,controller.getRecipts);

router.delete('/API/sm/recipts/:id',auth,controller.deleteRecipt);


module.exports=router;