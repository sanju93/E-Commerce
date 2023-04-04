const express = require('express');
const app = express();
const port = 8000;
require('./config/mongoose');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());


//views and static files setup
const express_ejs_layout = require('express-ejs-layouts');
app.use(express_ejs_layout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.use(express.static('./assets'));




app.use('/',routes);






app.listen(port,(err) => {
    if (err) {
        console.log("Error occuring in initaiting server");
        return;
    }
    console.log(`Server has connected on port ${port}`);
})