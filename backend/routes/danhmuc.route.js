import express from "express"
import {layDanhMuc,themDanhMuc, suaDanhMuc, xoaDanhMuc} from '../controllers/danhmuc.controller.js'

const router = express.Router()

router.get("/",layDanhMuc)
router.post("/them",themDanhMuc)
router.patch("/chinh/:id",suaDanhMuc)
router.delete("/:id",xoaDanhMuc)

export default router