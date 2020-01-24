const express= require('express');
const userModel= require('../models/user.model');
const router = express.Router();
const controller = require('../controllers/users');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/users',auth,controller.signUp);

router.post('/API/sm/users/login',controller.signIn);

router.put('/API/sm/users/:username',auth,controller.updateUser);

router.get('/API/sm/users',auth,controller.getUsers);

router.delete('/API/sm/users/:username',auth,controller.deleteUser);


module.exports=router;