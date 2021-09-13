const mongoose = require('mongoose');



const ratioSchema =  new mongoose.Schema({
    
    base:{
        type: String,
        maxlength: 3 ,

    },

    

    ratios: [{}],

    date: {
        type : Date,
        default : Date.now
    }
},{strict:false})


module.exports = mongoose.model('Ratios', ratioSchema );
