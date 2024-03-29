const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tableSchema = new Schema(
    {
        tableCode:{
            type:String,
            required:true,
            unique:true
        },
        clients:{
            type:Number,
            required:true,
            default:0
        },
        seats:{
            type:Array,
            required:true,
        }
    });

    module.exports = mongoose.model('Table',tableSchema);