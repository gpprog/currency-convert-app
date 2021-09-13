const express = require('express');
var cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// import routes
const authRoute = require('./routes/auth');
//const convertRoute = require('./routes/currencies');
const currencyRoute = require ('./routes/currency');
const ratiosRoute = require ('./routes/ratios');


dotenv.config();

const app = express();

app.use(cors()) // to avoid CORS Policy problem


app.use(express.json());


app.get('/',(req,res) =>{

    res.send("Server is up and running!")

})


// connect to db

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser:true}, ()=>
    console.log('Connected to Mongo dB')
    );



 
// Route middlewares

app.use('/api/user',authRoute);

//app.use('/api/currencies',convertRoute);

app.use('/api/currency', currencyRoute);

app.use('/api/ratios', ratiosRoute)



app.listen(80);