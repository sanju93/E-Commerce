const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    orderId : {
        type : String,
        require : true
    },
    paymentId : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        require : true
    },
    orderPlaced : {
        type : String,
        require : true
    },
    price : {
         type : Number,
         require : true
    },
    qty : {
       type : Number,
       require : true
    }
    

});

const Payments = mongoose.model('Payments',paymentSchema);

module.exports = Payments;