// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log("Error : ",err);
        throw err
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!!");
    
})


























// import mongoose from 'mongoose'
// import {DB_name} from './constants.js'
// import express from 'express'

// const app = express();


// (async ()=>{

//     try {
//        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
//        app.on("error",(error)=>{
//         console.log("Err",error);
//         throw error
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
//        })
//     } catch (error) {
//         console.error("Error : ",error);
//     }
// })()