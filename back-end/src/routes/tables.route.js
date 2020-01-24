const express= require('express');
const tableModel= require('../models/table.model');
const router = express.Router();
const controller = require('../controllers/tables');
const auth=require('passport').authenticate('jwt',{session:false});

router.post('/API/sm/tables',auth,controller.newTable);

router.patch('/API/sm/tables/:tableCode',auth,controller.updateTable);

router.get('/API/sm/tables',auth,controller.getTables);

router.delete('/API/sm/tables/:tableCode',auth,controller.deleteTable);

module.exports=router;