const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required: true,
        },
        role:{
            type:String,
            required: true,
        },
        salt:{
            type:String,
            required: true,
        },
        jobs:{
            type:Number,
            required:true,
            default:0
        }
    },
    {
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 1000
        }
    });


userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}
  
userSchema.methods.validatePassword = function(password) {
    const password_hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === password_hash;
}

module.exports = mongoose.model('User',userSchema);