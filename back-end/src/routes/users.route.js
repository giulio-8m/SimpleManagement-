const express= require('express');
const userModel= require('../models/user.model');
const router = express.Router();
const controller = require('../controllers/users');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/users',controller.signUp);

router.post('/users/login',controller.signIn);

router.put('/users/:username',controller.updateUser);

router.get('/users',controller.getUsers);

router.delete('/users/:username',controller.deleteUser);


module.exports=router;