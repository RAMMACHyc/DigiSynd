require('dotenv').config()
import express from "express";
import router from "./routes/apiRoutes";
import mongoose from "mongoose";
const app = express();

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('Connected to Database'))
app.use(express.json())
app.use("/", router)


export default app;
