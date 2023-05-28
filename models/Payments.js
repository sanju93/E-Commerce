const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

});

const Payments = mongoose.model('Payments',paymentSchema);

module.exports = Payments;