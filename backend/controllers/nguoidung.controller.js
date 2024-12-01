import Nguoidung from "../models/nguoidung.model.js"
import Dichvu from '../models/dichvu.model.js'
import {v2 as cloudinary} from 'cloudinary'

export const formDangKy = async (req, res) => {
    try {
        const { soDienThoai, diaChi } = req.body;
        const id = req.nguoidung._id.toString();

        const nguoidung = await Nguoidung.findOne({ _id: id });

        if (!nguoidung) {
            return res.status(404).json({ error: "Người dùng không tồn tại" });
        }

        // Kiểm tra vai trò của người dùng
        if (nguoidung.vaiTro === "freelancer") {
            return res.status(400).json({ message: "Bạn đã đăng ký là freelancer rồi." });
        }

        nguoidung.soDienThoai = soDienThoai;
        nguoidung.diaChi = diaChi;
        nguoidung.vaiTro = "freelancer"; 
        await nguoidung.save();

        return res.status(201).json({
            message: "Đăng ký thành freelancer thành công",
            user: {
                tenNguoiDung: nguoidung.tenNguoiDung,
                email: nguoidung.email,
                vaiTro: nguoidung.vaiTro,
                soDienThoai: nguoidung.soDienThoai,
                diaChi: nguoidung.diaChi,
            },
        });
    } catch (error) {
        console.log("Lỗi ", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};

export const layTheoId = async (req, res) => {
    const { id } = req.params; 
    try {
        const nguoidung = await Nguoidung.findById(id);
        return res.status(200).json(nguoidung);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi layTheoId controller", error.message);
    }
}

export const capNhat = async (req, res) => {
    const { tenNguoiDung, email, diaChi, soDienThoai } = req.body;
    let { anhND } = req.body; 

    const id = req.nguoidung._id;
    try {
        let nguoidung = await Nguoidung.findById(id);
        if (!nguoidung) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        if (anhND) {
        
            if (nguoidung.anhND) {
                await cloudinary.uploader.destroy(nguoidung.anhND.split("/").pop().split(".")[0]);
            }
        
            const uploadedResponse = await cloudinary.uploader.upload(anhND);
            anhND = uploadedResponse.secure_url;
        }

        nguoidung.tenNguoiDung = tenNguoiDung || nguoidung.tenNguoiDung;
        nguoidung.email = email || nguoidung.email;
        nguoidung.diaChi = diaChi || nguoidung.diaChi;
        nguoidung.soDienThoai = soDienThoai || nguoidung.soDienThoai;
        nguoidung.anhND = anhND || nguoidung.anhND;

        nguoidung = await nguoidung.save();

        return res.status(200).json({ nguoidung });
    } catch (error) {
        console.log("Lỗi capNhat controller:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const yeuThich = async (req, res) => {
    try {   
        const idDV = req.params.id; 
        const idND = req.nguoidung._id;
        const nguoiDung = await Nguoidung.findById(idND);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const index = nguoiDung.danhSachYeuThich.indexOf(idDV);
        if (index === -1) {
            nguoiDung.danhSachYeuThich.push(idDV);
        } else {
            nguoiDung.danhSachYeuThich.splice(index, 1);
        }
        await nguoiDung.save();

        return res.status(200).json({
            message: index === -1 ? "Đã thêm vào danh sách yêu thích" : "Đã xóa khỏi danh sách yêu thích",
            danhSachYeuThich: nguoiDung.danhSachYeuThich,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi yêu thích controller", error.message);
    }
};

export const layYeuThich = async (req, res) => {
    try {   
        const idND = req.nguoidung._id;
        const { page = 1, limit = 4 } = req.query;
        const pageSize = parseInt(limit);
        const skip = (page - 1) * pageSize;

        const nguoiDung = await Nguoidung.findById(idND)
        .populate({
            path: "danhSachYeuThich",
            populate: {
                path: "idNguoiDungDV",
                select: "tenNguoiDung"
            }
        });

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const danhSachYeuThich = nguoiDung.danhSachYeuThich;
        const tong = danhSachYeuThich.length;
        const tongPage = Math.ceil(tong / pageSize);

        const danhSachYeuThichPaginized = danhSachYeuThich.slice(skip, skip + pageSize);

        return res.status(200).json({
            danhSachYeuThich: danhSachYeuThichPaginized,
            tong,
            tongPage
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi yêu thích controller", error.message);
    }
};


