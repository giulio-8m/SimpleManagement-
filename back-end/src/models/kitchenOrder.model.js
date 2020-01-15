const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


let kitchenOrderSchema= new Schema({

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
    kitchenNumber:{
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

kitchenOrderSchema.plugin(AutoIncrement,{inc_field: 'kitchenNumber'});
module.exports = mongoose.model('KitchenOrder',kitchenOrderSchema);