import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import morgan from 'morgan';
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"
const app= express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/user",userRouter); //
app.use("/tour",tourRouter);
 const MONGODB_URL="mongodb+srv://madhukarschinthakunta:madhukar@cluster0.8huhmel.mongodb.net/?retryWrites=true&w=majority"
 
 //mongodb+srv://madhukarschinthakunta:madhukar@cluster0.8huhmel.mongodb.net/rour_db?retryWrites=true&w=majority
const port =5000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>
        console.log(`sever  running on ${port}`))
}).catch ((error)=>console.log(`${error} did not connect`))


           