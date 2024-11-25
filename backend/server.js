import express from "express"
import morgan from 'morgan'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectMongoDB from "./db/connectMongoDB.js"
import {v2 as cloudinary} from "cloudinary"

import authRoutes from "./routes/auth.route.js"
import danhmucRoutes from "./routes/danhmuc.route.js"
import dichvuRoutes from "./routes/dichvu.route.js"
import userRoutes from "./routes/nguoidung.route.js"
import giohangRoutes from "./routes/giohang.route.js"
import donhangRoutes from "./routes/donhang.route.js"
import vnpayRoutes from "./routes/vnpay.route.js"

dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000



app.use(morgan("tiny"))
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: true, limit: '500mb' }))
app.use(cookieParser())

app.use("/api/user",userRoutes )
app.use("/api/auth",authRoutes )
app.use("/api/danhmuc",danhmucRoutes )
app.use("/api/dichvu",dichvuRoutes )
app.use("/api/giohang",giohangRoutes )
app.use("/api/donhang",donhangRoutes )
app.use("/api/vnpay",vnpayRoutes )

app.get("/", (req, res) => {
    res.send("Xin chào bạn");
});


app.listen(5000, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
})