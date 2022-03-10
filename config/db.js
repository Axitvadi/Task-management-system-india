"use strict"
let mongoose = require("mongoose")

require("../models/userSchema")
require("../models/detailSchema")
require("../models/messageSchema")

mongoose.Promise = global.Promise;

mongoose.connect(process.env.url,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

let db = mongoose.connection;

db.on('error',console.error.bind(console,"failed to connect server"));

db.once('open',()=>{console.log("succesfuly connected to Database..!")});