const mongoose = require('mongoose');
var adminScheama = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require: true
    },
    code : {
        type : String,
        require : true
    }
});


const Admin = mongoose.model('Admin',adminScheama);
module.exports = Admin;