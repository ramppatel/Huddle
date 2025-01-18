const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const port = 3001
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Token"],
  };

app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// all routes

// login signup routes
app.use('/dashboard/api/',require('./routes/dashboard_api_routes'));
// profile routes
app.use('/profile/',require('./routes/profile_routes'));

app.get("/dashboard/api/login", (req, res) => {
    res.send("Hello from Dashboard API Login");
  });

app.listen(port,()=>{
    console.log(`Listening at Port ${port}`);
})