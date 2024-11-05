import express from "express"

import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectMongoDB from "./db/connectMongoDB.js"

import authRoutes from "./routes/auth.route.js"
import danhmucRoutes from "./routes/danhmuc.route.js"
import dichvuRoutes from "./routes/dichvu.route.js"
import userRoutes from "./routes/nguoidung.route.js"

dotenv.config()

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true })) //to parse form data
app.use(cookieParser())


app.use("/api/user",userRoutes )
app.use("/api/auth",authRoutes )
app.use("/api/danhmuc",danhmucRoutes )
app.use("/api/dichvu",dichvuRoutes )

app.get("/", (req, res) => {
    res.send("Xin chào bạn");
});


app.listen(5000, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
})