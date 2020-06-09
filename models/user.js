var mongoose = require("mongoose");
var passportlocalmongoose =require("passport-local-mongoose");

var userSchema  = new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    age:Number,
    email:String,
    avatar:String,
    about:String,
    isAdmin: {type:Boolean,default:false}
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User",userSchema);