import Nguoidung from "../models/nguoidung.model.js"

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
