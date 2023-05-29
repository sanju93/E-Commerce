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
    },
    cart : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }
    ],
    orders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Payments'
    }]
   
},{
    timestamps:true
});

const Users = mongoose.model('Users',userSchema);
module.exports = Users;