import Dichvu from '../models/dichvu.model.js'
import Nguoidung from '../models/nguoidung.model.js'
import Danhmuc from '../models/danhmuc.model.js'

export const layDichVu = async (req, res) => {
    try {
        const dichvu = await Dichvu.find();
        res.status(200).json(dichvu);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layDichVu controller", error);
    }
};
export const themDichVu = async (req, res) => {
    try {
        const { tenDichVu, moTaDV, giaTien, kyNang, thoiGianHoanThanh, trangThaiDV, idDanhMucDV } = req.body;

        const dichVuMoi = new Dichvu({
            tenDichVu,
            moTaDV,
            giaTien,
            kyNang,
            thoiGianHoanThanh,
            trangThaiDV,
            idDanhMucDV
        });

        await dichVuMoi.save();

        const danhMuc = await Danhmuc.findById(idDanhMucDV);
        if (!danhMuc) {
            console.log("Không tìm thấy danh mục với ID:", idDanhMucDV); // Log ID danh mục
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        danhMuc.idDichVuDM.push(dichVuMoi._id); 
        await danhMuc.save();

        res.status(201).json(dichVuMoi);

    } catch (error) {
        console.log("Lỗi themDichVu controller", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};


export const suaDichVu = async (req, res) => {
    const { tenDichVu, moTaDV, kyNang, giaTien, thoiGianHoanThanh, trangThaiDV, idDanhMucDV} = req.body;

    try {
        let dichvu = await Dichvu.findById(req.params.id);

        if (!dichvu) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });

        if (tenDichVu) dichvu.tenDichVu = tenDichVu;
        if (moTaDV) dichvu.moTaDV = moTaDV;
        if (giaTien) dichvu.giaTien = giaTien;
        if (kyNang) dichvu.kyNang = kyNang;
        if (thoiGianHoanThanh) dichvu.thoiGianHoanThanh = thoiGianHoanThanh;
        if (trangThaiDV) dichvu.trangThaiDV = trangThaiDV;

        const idDanhMucCu = dichvu.idDanhMucDV;

        if (idDanhMucDV) {
            const danhMucCu = await Danhmuc.findById(idDanhMucCu);
            const danhMucMoi = await Danhmuc.findById(idDanhMucDV);

            if (!danhMucMoi) {
                return res.status(404).json({ message: "Không tìm thấy danh mục này" });
            }

            if (danhMucCu) {
                danhMucCu.idDichVuDM.pull(dichvu._id); 
                await danhMucCu.save(); 
            }

            dichvu.idDanhMucDV = danhMucMoi._id; 
            danhMucMoi.idDichVuDM.push(dichvu._id); 
            await danhMucMoi.save();
        }

        dichvu = await dichvu.save();

        return res.status(200).json({ dichvu });
    } catch (error) {
        console.log("Lỗi suaDichVu controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const xoaDichVu = async (req, res) => {
    try {
        const dichvu = await Dichvu.findById(req.params.id);
        if (!dichvu) {
            return res.status(404).json({ error: "Không tìm thấy dịch vụ" });
        }

        const danhmuc = await Danhmuc.findById(dichvu.idDanhMucDV);
        if (danhmuc) {
            danhmuc.idDichVuDM = danhmuc.idDichVuDM.filter(
                id => id.toString() !== req.params.id
            );
            await danhmuc.save();
        }

        await Dichvu.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Xóa dịch vụ thành công" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi xoaDichVu controller", error.message);
    }
};


export const idDichvu = async (req, res) => {
    const { id } = req.params; 
    console.log(id)
    try {   
        const dichvu = await Dichvu.findById(id);
        if (!dichvu) {
            return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
        }
        console.log(dichvu)
        return res.status(200).json(dichvu);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi idDichVu controller", error.message);
    }
}

export const DichvutheoDM = async (req, res) => {
    const { id } = req.params; 
    try {
        const danhmuc = await Danhmuc.findById(id);
        if (!danhmuc) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' });
        }

        const dichvu = await Dichvu.find({ idDanhMucDV: id });

        return res.status(200).json(dichvu);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi DichvutheoDM controller", error.message);
    }
}