const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    confirm_password : {
        type : String,
        required : true
    }
},{
    timestamps:true
});

const Users = mongoose.model('Users',userSchema);
module.exports = Users;