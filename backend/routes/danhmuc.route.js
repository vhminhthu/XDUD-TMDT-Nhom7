import express from "express"
import {layDanhMuc,themDanhMuc, suaDanhMuc, xoaDanhMuc} from '../controllers/danhmuc.controller.js'
import { layTheoId } from "../controllers/nguoidung.controller.js"

const router = express.Router()

router.get("/",layDanhMuc)
router.post("/them",themDanhMuc)
router.patch("/chinh/:id",suaDanhMuc)
router.delete("/:id",xoaDanhMuc)
router.get("/layTheoId/:id",layTheoId)

export default router