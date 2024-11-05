import Nguoidung from "../models/nguoidung.model.js"

export const formDangKy = async (req, res) => {
    try {
        const { email, soDienThoai, diaChi } = req.body;

        const nguoidung = await Nguoidung.findOne({ email });
        if (!nguoidung) {
            return res.status(404).json({ error: "Người dùng không tồn tại" });
        }

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

