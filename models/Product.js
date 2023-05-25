const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    sportType : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    Brand : {
        type : String,
        require : true
    },
    Colour : {
        type : String,
        require : true
    },
    weight : {
        type : String,
        require : true
    },
    size : {
        type : String,
        require : true
    },
    quantity : {
        type : String,
        require : true
    }

});


let Product = mongoose.model('Product',productSchema);

module.exports = Product;