"use strict"
var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "fill username"]
    },
    email: {
        type: String,
        required: [true, "fill email"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "fill password"]
    },
    role: {
        type: Array,
        default: ['user']
    },
    userverification: {
        type: Boolean,
        default: false
    },

//     work: [
//         {
//         Projectname: {
//             type: String,
//         },
//         Dateofassigned: {
//             type: String,
//         },
//         Projectstatus: {
//             type: String,
//         },
//         DateOfcompleted: {
//             type: String,
//         },
//         projectprogress:{
//             type: String,
//         }
//     }
// ],
    Job: {
        type: String,
        default: "web developer"
    },
})
var user = mongoose.model('user', userSchema)
module.exports = user