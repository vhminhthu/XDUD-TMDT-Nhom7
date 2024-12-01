import express from "express"
import {formDangKy, layTheoId,capNhat,yeuThich, layYeuThich} from '../controllers/nguoidung.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/form",protectRoute,formDangKy)
router.get("/layTheoId/:id",layTheoId)
router.patch("/update",protectRoute,capNhat)

router.post("/capnhat/yeuthich/:id",protectRoute,yeuThich)
router.get("/lay/yeuthich",protectRoute,layYeuThich)


export default router