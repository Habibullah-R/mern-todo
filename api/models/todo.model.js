const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    check:{
        type:Boolean,
        default:false
    },
    userRef:{
        type:String,
        required:true
    }
},{timestamps:true})

const Todo = new mongoose.model("Todo",todoSchema);


module.exports = Todo