import express from "express"
import {layDichVu,themDichVu, suaDichVu, xoaDichVu, idDichvu} from '../controllers/dichvu.controller.js'

const router = express.Router()

router.get("/",layDichVu)
router.post("/them",themDichVu)
router.patch("/chinh/:id",suaDichVu)
router.delete("/:id",xoaDichVu)
router.get("/lay/:id",idDichvu)
router.get("/theodanhmuc/:id",DichvutheoDM)

export default router