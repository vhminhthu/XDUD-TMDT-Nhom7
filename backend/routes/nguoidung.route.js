import express from "express"
import {formDangKy, layTheoId,capNhat} from '../controllers/nguoidung.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/form",protectRoute,formDangKy)
router.get("/layTheoId/:id",layTheoId)
router.patch("/update",protectRoute,capNhat)
export default router