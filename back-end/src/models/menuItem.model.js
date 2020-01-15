const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuItemSchema = new Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        time:{
            type:Number,
            required:true
        }
    });

    module.exports = mongoose.model('MenuItem',menuItemSchema);