const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    complete:
    {
        type:Boolean,
        default:false
    },
    timeStamp:
    {
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("ToDo's",todoSchema);