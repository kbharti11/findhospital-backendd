const mongoose = require ("mongoose")
const Form = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        require:true
    },
    interest:{
        type:String,
        require:true
    }
   
   


})

module.exports = mongoose.model("Forms",Form)