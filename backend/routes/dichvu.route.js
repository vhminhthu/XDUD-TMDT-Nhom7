import express from "express"
<<<<<<< HEAD
import {layDichVu,themDichVu, suaDichVu, xoaDichVu, idDichvu} from '../controllers/dichvu.controller.js'
=======
import {layDichVu,idDichvu,themDichVu, suaDichVu, xoaDichVu} from '../controllers/dichvu.controller.js'
>>>>>>> 60fed8ab2de686b5bc9f928f393915fa68851bc6

const router = express.Router()

router.get("/",layDichVu)
router.get("/lay/:id",idDichvu)
router.post("/them",themDichVu)
router.patch("/chinh/:id",suaDichVu)
router.delete("/:id",xoaDichVu)
router.get("/lay/:id",idDichvu)

export default router