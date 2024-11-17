import express from "express"
import {layDichVu,themDichVu, suaDichVu, xoaDichVu, idDichvu, DichvutheoDM, layTheoNguoiDung} from '../controllers/dichvu.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.get("/",layDichVu)
router.post("/them",protectRoute,themDichVu)
router.patch("/chinh/:id",suaDichVu)
router.delete("/:id",xoaDichVu)
router.get("/lay/:id",idDichvu)
router.get("/theodanhmuc/:id",DichvutheoDM)
router.get("/theonguoidung",protectRoute, layTheoNguoiDung)

export default router