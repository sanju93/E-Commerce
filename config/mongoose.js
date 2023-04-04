require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MongodbUrl)
.then(()=> {
    console.log("database conected successfully");
},
(err) => {
    console.log("error in connecting to the database");
})