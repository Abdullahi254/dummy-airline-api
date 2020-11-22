const express = require('express');
const app = express();
const flights = require('./routes/flights')
const mongoose = require('mongoose')
require('dotenv').config()

//middleware
app.use(express.json())

app.use('/api/flightsinfo',flights)


//connect to db
mongoose.connect(
    process.env.DB_INFO,
    {useNewUrlParser:true,
    useUnifiedTopology:true},
    ()=>{
        console.log('connected to DB!')
    }
)

app.listen('4000',()=>console.log('SERVER UP ON PORT 4000'))