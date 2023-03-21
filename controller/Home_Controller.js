module.exports.home = (req,res) => {
    return res.status(200).render('home',{
        title : 'Home'
    });
} 