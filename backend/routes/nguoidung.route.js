import express from "express"
import {formDangKy, layTheoId,capNhat,yeuThich, layYeuThich, capNhatSoDu, layGiaoDich, capNhatSoDuRutTien} from '../controllers/nguoidung.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.post("/form",protectRoute,formDangKy)
router.get("/layTheoId/:id",layTheoId)
router.patch("/update",protectRoute,capNhat)

router.post("/capnhat/yeuthich/:id",protectRoute,yeuThich)
router.get("/lay/yeuthich",protectRoute,layYeuThich)

router.patch("/capnhat/sodu",capNhatSoDu)
router.patch("/capnhat/sodu/ruttien",protectRoute,capNhatSoDuRutTien)
router.get("/lay/giaodich",protectRoute,layGiaoDich)


export default router