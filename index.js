require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
const uri=process.env.MONGO_URI;
//mongo db ka connection
try {
    mongoose.connect(uri,{
        
       
        useUnifiedTopology:true
    });
    console.log("Connected to the mongodb")
} catch (error) {
    console.log("Error: ",error)
}

//routes

// Routes
const incidentsRouter = require('./routes/incidents');
app.use('/incidents', incidentsRouter);


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));
