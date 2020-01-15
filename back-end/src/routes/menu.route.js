const express= require('express');
const menuItemModel= require('../models/menuItem.model');
const router = express.Router();
const controller = require('../controllers/menu');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/menu',controller.newItem);

router.get('/menu',controller.getMenu);


module.exports=router;