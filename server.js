require('dotenv').config();
const db=require('./db');
const express=require('express');
const cors = require("cors");
const app=express();
app.use(express.json());//BODY PARSER
//const passport=require('./auth');


app.use(cors({
  origin: "https://votesure.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


const PORT=process.env.PORT || 3000;
const userRoutes=require('./routes/userRoutes');
app.use('/user',userRoutes);
const candidateRoutes=require('./routes/candidateRoutes');
app.use('/candidate',candidateRoutes);
app.listen(PORT,()=>{
    console.log("Port is Running");
})
