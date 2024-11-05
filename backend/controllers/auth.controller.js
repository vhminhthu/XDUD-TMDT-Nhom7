import Nguoidung from '../models/nguoidung.model.js' 
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';

export const dangKy = async (req, res) => {
    try {
        const { tenNguoiDung, email, matKhau } = req.body;


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Định dạng email không hợp lệ" });
        }


        const nguoiDung_tonTai = await Nguoidung.findOne({ tenNguoiDung });
        if (nguoiDung_tonTai) {
            return res.status(400).json({ error: "Tên tài khoản đã được sử dụng" });
        }


        const email_tonTai = await Nguoidung.findOne({ email });
        if (email_tonTai) {
            return res.status(400).json({ error: "Email này đã được sử dụng" });
        }

        if (matKhau.length <= 6) {
            return res.status(400).json({ error: "Mật khẩu ít nhất phải có 6 ký tự" });
        }


        const salt = await bcrypt.genSalt(10);
        const matKhauhash = await bcrypt.hash(matKhau, salt);


        const nguoiDungMoi = new Nguoidung({
            tenNguoiDung,
            email,
            matKhau: matKhauhash,
            vaiTro: "user"
        });

        if (nguoiDungMoi) {
			generateTokenAndSetCookie(nguoiDungMoi._id, res);
			await nguoiDungMoi.save();

			res.status(201).json({
				_id: nguoiDungMoi._id,
                tenNguoiDung: nguoiDungMoi.tenNguoiDung,
                email: nguoiDungMoi.email,
                vaiTro: nguoiDungMoi.vaiTro,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}

      
    } catch (error) {
        console.log("Lỗi dangKy controller", error.message);
        res.status(500).json({ error: "Lỗi 500" });
    }
}

 
export const danhNhap = async (req,res)=>{
    try{
     const {email, matKhau } = req.body
     const nguoidung = await Nguoidung.findOne({email})
     const kiemTra_matKhau = await bcrypt.compare(matKhau, nguoidung?.matKhau || "")  
 
     if(!email || !kiemTra_matKhau){
         return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" })
     }

     generateTokenAndSetCookie(nguoidung._id,res)
 
     res.status(200).json({
         email: nguoidung.email,
     })
 
    } catch (error) {
     console.log("Lỗi danhNhap controller",error.message)
     res.status(500).json({ error: "Lỗi 500" })
    }
 }

 
 export const dangXuat = async (req,res)=>{
     try{
         res.cookie("jwt","",{maxAge:0})
         res.status(200).json({ message:"Logged out successfully" })
     } catch (error) {
         console.log("Error in logout controller",error.message)
         res.status(500).json({ error: "Internal Server Error "})
     }
 }

 
export const getMe = async(req,res)=>{
    try{
        const nguoidung = await Nguoidung.findById(req.nguoidung._id).select("-matKhau")
        res.status(200).json(nguoidung)
    }catch(error){
        console.log("Error in getMe controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}