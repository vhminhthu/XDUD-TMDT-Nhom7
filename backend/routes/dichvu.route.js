import express from "express"
import {layDichVu,idDichvu,themDichVu, suaDichVu, xoaDichVu} from '../controllers/dichvu.controller.js'

const router = express.Router()

router.get("/",layDichVu)
router.get("/lay/:id",idDichvu)
router.post("/them",themDichVu)
router.patch("/chinh/:id",suaDichVu)
router.delete("/:id",xoaDichVu)

export default router