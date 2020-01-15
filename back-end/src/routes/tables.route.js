const express= require('express');
const tableModel= require('../models/table.model');
const router = express.Router();
const controller = require('../controllers/tables');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/tables',controller.newTable);

router.put('/tables/:tableCode',controller.updateTable);

router.get('/tables',controller.getTables);


module.exports=router;