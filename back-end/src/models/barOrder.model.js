const mongoose = require('mongoose');
var autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


let barOrderSchema= new Schema({

    tableCode:{
        type:String,
        required:true
    },
    waiter:{
        type:String,
        required:true
    },
    clients:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"ongoing"
    },
    progress:{
        type:Number,
        required:true,
        default:0
    },
    barNumber:{
        type:Number,
    },
    items:{
        type:Array,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

barOrderSchema.plugin(autoIncrement,{inc_field: 'barNumber'});
module.exports = mongoose.model('BarOrder',barOrderSchema);