const express = require("express");
const dotEnv  = require('dotenv').config();
const connectDB = require('./dbconfig/config')
const userRoutes =  require('./routes/web');
const port  = process.env.PORT
let bodyParser = require('body-parser')

const app = express()

//Note this is needed incase form data not showing
app.use(bodyParser.urlencoded({ extended: true }));





app.use('/', userRoutes)

connectDB();


app.listen(port ,()=>{
    console.log("Server running at  port"+ port);
})
