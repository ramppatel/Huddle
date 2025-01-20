const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const port = 3001;
const cors = require("cors");
const userRoute = require("./routes/user")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// all routes

// login signup routes
app.use("/api/user", userRoute);

app.get("/api/user/login", (req, res) => {
  res.send("Hello from Dashboard API Login");
});

app.listen(port, () => {
  console.log(`Listening at Port ${port}`);
});
