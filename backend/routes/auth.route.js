import express from "express"
import {dangKy, danhNhap, dangXuat, getMe, } from '../controllers/auth.controller.js'
const router = express.Router()

router.post("/signup",dangKy)
router.post("/login",danhNhap)
router.post("/logout",dangXuat)
router.get("/getme",getMe)

export default router