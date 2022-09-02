import express from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload"
import User from './routes/userRoute.js'
import Stores from './routes/storeRoute.js'
import Product from "./routes/productRoute.js"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
    })
  );
  app.use(cors())
app.use('/',User)
app.use('/',Stores)
app.use('/',Product)
