import express from "express"
import {formDangKy} from '../controllers/nguoidung.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/form",protectRoute,formDangKy)


export default router