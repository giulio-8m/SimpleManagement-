const express= require('express');
const menuItemModel= require('../models/menuItem.model');
const router = express.Router();
const controller = require('../controllers/menu');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/menu',auth,controller.newItem);

router.get('/API/sm/menu',auth,controller.getMenu);

router.put('/API/sm/menu/:name',auth,controller.updateItem);

router.delete('/API/sm/menu/:name',auth,controller.deleteItem);

module.exports=router;