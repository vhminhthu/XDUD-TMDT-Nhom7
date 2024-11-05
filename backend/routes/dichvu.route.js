import express from "express"
import {layDichVu,themDichVu, suaDichVu, xoaDichVu} from '../controllers/dichvu.controller.js'
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.get("/",layDichVu)
router.post("/them",protectRoute,themDichVu)
router.patch("/chinh/:id",protectRoute,suaDichVu)
router.delete("/:id",protectRoute,xoaDichVu)

export default router