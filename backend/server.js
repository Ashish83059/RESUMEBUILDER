requier ("dotenv").config();
const express= require("express");
const cors = require("cors");
const path = requir("path");

const app=express();

//  Middleware to Handle CORS

app.use{
    cors({
        origin: process.env.CLIENT_URL ||"*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
};

//Middleware
app.use(express.json());

//start server
const PORT= process.env.PORT || 5000;
app.listen(PORT, ()=>
 console.log(`server running or port ${PORT}`));
