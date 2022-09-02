import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import cloudinary from 'cloudinary'

import {config} from "dotenv"
config({
    path:"./config/config.env"
    
})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
connectDatabase()

app.listen(process.env.PORT,()=>{
console.log(`server is running on http://127.0.0.1:${process.env.PORT}`)
})