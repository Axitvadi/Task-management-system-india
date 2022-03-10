"use strict"
var mongoose = require("mongoose")

var messageSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    message:{
        type:String
    }
})
var message = mongoose.model('message', messageSchema);
module.exports = message;