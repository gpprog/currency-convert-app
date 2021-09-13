const mongoose = require('mongoose');



const currencySchema = new mongoose.Schema({

    currencyName: {
        type: String,
        required: true,
        min: 6,

    },

    currencySymbol: {
        type: String,
        required: false,
        max: 5
    },

    currencyId: {
        type: String,
        required: true,
        min:3
    }

    





});



module.exports = mongoose.model('Currencies', currencySchema );

