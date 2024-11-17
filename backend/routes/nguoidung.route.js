import express from "express"
import {formDangKy, layTheoId} from '../controllers/nguoidung.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/form",protectRoute,formDangKy)
router.get("/layTheoId/:id",layTheoId)

export default router