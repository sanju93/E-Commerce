var User = require('../models/User');
var Product = require('../models/Product');
module.exports.AddtoCart = async function(req,res) {

    try{

        var user = await User.findById(req.user.id);
        await user.cart.push(req.body.id);
        await user.save();
        req.flash('success','Added to Cart');
        return res.status(200).json({success : true});

    }catch(err){

        console.log(err);
        req.flash('error','Error Occuring to add in cart');
        return res.status(401).json({success : false});

    }
    

}


module.exports.cart = async (req,res) => {
    console.log(req.user);

    var user = await User.findById(req.user);

    var products = [];

    for (var i = 0; i < user.cart.length;i++){

   

        var product = await Product.findById(user.cart[i]);

         products.push(product);
        
    }




    return res.render('cart',{
        title : 'cart',
        cart : products
    })
}