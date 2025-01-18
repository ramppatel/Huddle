const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const port = 3001
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();

// fixing cors issue allow all origins
const corsOptions = {
    origin: "*", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Token"], // Allowed headers
    // credentials: true, // Allow cookies/authentication
  };
  
app.use(cors(corsOptions)); // Apply CORS middleware
app.options("*", cors(corsOptions)); // Handle preflight requests

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