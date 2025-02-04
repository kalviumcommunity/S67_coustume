const express = require('express');
const connectDB = require('./db');
const app = express();
const port = 3000;
require('dotenv').config();
const url=process.env.mong;
console.log(url);

app.listen(port,async()=>{

    try{
        await connectDB(url);
        console.log(`Server is running on port ${port}`);
    }    
    catch(err){
        console.log(err);
    }    
    });