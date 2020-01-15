const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reciptSchema = new Schema({
    date:{
        type:String,
        required:true
    },
    tableCode:{
        type:String,
        required:true    
    },
    barItems:{
        type:Array
    },
    kitchenItems:{
        type:Array
    },
    totalBar:{
        type:Number
    },
    totalKitchen:{
        type:Number
    },
    total:{
        type:Number,
        required:true
    }
    });

    module.exports = mongoose.model('Recipt',reciptSchema);