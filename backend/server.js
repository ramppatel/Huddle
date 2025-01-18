const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const port = 3001


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

// all routes

// login signup routes
app.use('/dashboard/api/',require('./routes/dashboard_api_routes'));
// profile routes
app.use('/profile/',require('./routes/profile_routes'));

app.listen(port,()=>{
    console.log(`Listening at Port ${port}`);
})