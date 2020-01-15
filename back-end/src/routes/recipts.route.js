const express= require('express');
const reciptModel= require('../models/recipt.model');
const router = express.Router();
const controller = require('../controllers/recipts');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/recipts',controller.newRecipt);

router.get('/recipts',controller.getRecipts);


module.exports=router;