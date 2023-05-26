const express = require('express');
const app = express();
const port = 8000;
require('./config/mongoose');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport-local-strategy');
require('./config/passport-google-strategy');
const expressSession = require('express-session');
const mongostore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();
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

app.use(expressSession({
    name : 'E-Commerce',
    secret : 'E-Commerce93',
    cookie: {
        maxAge : 1000 * 60 * 60 * 24  
    },
    store : mongostore.create({mongoUrl : process.env.MongodbUrl})
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);


app.use(flash());

app.use(require('./config/flashMiddleware').flash);

let fileUpload = require('express-fileupload');

app.use(fileUpload());







app.use('/',routes);






app.listen(port,(err) => {
    if (err) {
        console.log("Error occuring in initaiting server");
        return;
    }
    console.log(`Server has connected on port ${port}`);
})