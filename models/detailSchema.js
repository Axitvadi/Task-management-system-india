"use strict"
var mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");

var detailSchema = new mongoose.Schema({
    developer:{
        type:String
    },
    Job:{
        type:String
    },
    Projectname:{
        type:String
    },
    Dateofassigned:{
        type:String
    },
    Projectstatus:{
        type:String
    },
    DateOfcompleted:{
        type:String
    },
    projectprogress:{
        type: String
    }

})

detailSchema.plugin(mongoosePaginate);

var detail = mongoose.model('detail',detailSchema);
module.exports = detail;