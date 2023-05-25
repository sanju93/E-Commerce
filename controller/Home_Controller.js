var {Transform} = require('stream');
const Product = require('../models/Product');
module.exports.home = (req,res) => {

    
    return res.status(200).render('home',{
        title : 'Home'
    });
}

module.exports.Products = (req,res) => {

    const TransformData = new Transform({objectMode : true});

    TransformData.isWritten = false;

    TransformData._transform = function(chunk,encoding,callback){
        if (!this.isWritten){
            this.isWritten = true;
            callback(null,'[' + JSON.stringify(chunk))
        }else{
            callback(null,','+JSON.stringify(chunk));
        }
    }

    TransformData._flush = function(callback){
        callback(null,']');
    }

    var products = Product.find({}).cursor().pipe(TransformData);

    products.pipe(res);

}