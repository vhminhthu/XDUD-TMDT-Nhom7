import Dichvu from '../models/dichvu.model.js'
import Nguoidung from '../models/nguoidung.model.js'
import Danhmuc from '../models/danhmuc.model.js'
import {v2 as cloudinary} from 'cloudinary'

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
        const id = req.nguoidung._id.toString();
        const idNguoiDungDV = id;
        
        const {
            tenDichVu,
            moTaDV,
            kyNang,
            trangThaiDV,
            idDanhMucDV,
            phanLoai,
            anhDichVu
        } = req.body;

        if (!phanLoai || !phanLoai.coban || !phanLoai.thuong || !phanLoai.nangcao) {
            return res.status(400).json({ message: "Yêu cầu phải cung cấp đầy đủ các gói giá (coban, thuong, nangcao)" });
        }

        let anhDichVuUrl = anhDichVu;
        if (anhDichVu) {
            try {
                const uploadResult = await cloudinary.uploader.upload(anhDichVu);
                anhDichVuUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh lên Cloudinary" });
            }
        }

        const dichVuMoi = new Dichvu({
            tenDichVu,
            moTaDV,
            kyNang,
            trangThaiDV,
            idDanhMucDV,
            idNguoiDungDV,
            phanLoai: {
                coban: {
                    tenLoai: phanLoai.coban.tenLoai,
                    giaLoai: phanLoai.coban.giaLoai,
                    moTaLoai: phanLoai.coban.moTaLoai,
                    thoiGianDuKien: phanLoai.coban.thoiGianDuKien
                },
                thuong: {
                    tenLoai: phanLoai.thuong.tenLoai,
                    giaLoai: phanLoai.thuong.giaLoai,
                    moTaLoai: phanLoai.thuong.moTaLoai,
                    thoiGianDuKien: phanLoai.thuong.thoiGianDuKien
                },
                nangcao: {
                    tenLoai: phanLoai.nangcao.tenLoai,
                    giaLoai: phanLoai.nangcao.giaLoai,
                    moTaLoai: phanLoai.nangcao.moTaLoai,
                    thoiGianDuKien: phanLoai.nangcao.thoiGianDuKien
                }
            },
            anhDichVu: anhDichVuUrl
        });

        await dichVuMoi.save();

        const danhMuc = await Danhmuc.findById(idDanhMucDV);
        if (!danhMuc) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        danhMuc.idDichVuDM.push(dichVuMoi._id); 
        await danhMuc.save();

        const nguoiDung = await Nguoidung.findById(idNguoiDungDV);
            if (!nguoiDung) {
                return res.status(404).json({ message: "nguoiDung không tồn tại." });
            }

        nguoiDung.idDichVuND.push(dichVuMoi._id); 
        await nguoiDung.save();

        res.status(201).json(dichVuMoi);

    } catch (error) {
        console.log("Lỗi themDichVu controller", error.message);
        return res.status(500).json({ error: "Lỗi 500" });
    }
};


export const suaDichVu = async (req, res) => {
    try {
        const {
            tenDichVu,
            moTaDV,
            kyNang,
            trangThaiDV,
            idDanhMucDV,
            phanLoai,
            anhDichVu
        } = req.body;

        let dichvu = await Dichvu.findById(req.params.id);

        if (!dichvu) return res.status(404).json({ message: "Không tìm thấy dịch vụ" });

        if (tenDichVu) dichvu.tenDichVu = tenDichVu;
        if (moTaDV) dichvu.moTaDV = moTaDV;
        if (kyNang) dichvu.kyNang = kyNang;
        if (trangThaiDV) dichvu.trangThaiDV = trangThaiDV;

        if (phanLoai) {
            dichvu.phanLoai = {
                coban: {
                    tenLoai: phanLoai.coban.tenLoai,
                    giaLoai: phanLoai.coban.giaLoai,
                    moTaLoai: phanLoai.coban.moTaLoai,
                    thoiGianDuKien: phanLoai.coban.thoiGianDuKien
                },
                thuong: {
                    tenLoai: phanLoai.thuong.tenLoai,
                    giaLoai: phanLoai.thuong.giaLoai,
                    moTaLoai: phanLoai.thuong.moTaLoai,
                    thoiGianDuKien: phanLoai.thuong.thoiGianDuKien
                },
                nangcao: {
                    tenLoai: phanLoai.nangcao.tenLoai,
                    giaLoai: phanLoai.nangcao.giaLoai,
                    moTaLoai: phanLoai.nangcao.moTaLoai,
                    thoiGianDuKien: phanLoai.nangcao.thoiGianDuKien
                }
            };
        }

        if (anhDichVu) {
            let anhDichVuUrl = anhDichVu;

            try {
                const uploadResult = await cloudinary.uploader.upload(anhDichVu);
                anhDichVuUrl = uploadResult.secure_url;
            } catch (uploadError) {
                console.log("Lỗi upload ảnh:", uploadError.message);
                return res.status(500).json({ error: "Lỗi khi upload ảnh lên Cloudinary" });
            }

            dichvu.anhDichVu = anhDichVuUrl; 
        }

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

        const nguoiDung = await Nguoidung.findById(dichvu.idNguoiDungDV);

        if (!nguoiDung) {
            return res.status(404).json({ message: "Người dùng không tồn tại." });
        }
        
            if (!nguoiDung.idDichVuND.includes(dichvu._id)) {
                nguoiDung.idDichVuND.push(dichvu._id);
                await nguoiDung.save();
            }

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
    try {   
        const dichvu = await Dichvu.findById(id).populate("idDanhMucDV").populate("idNguoiDungDV");
        if (!dichvu) {
            return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
        }
        return res.status(200).json(dichvu);
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi idDichVu controller", error.message);
    }
}

export const DichvutheoDM = async (req, res) => {
    const { id } = req.params; 
    const { sort = "phobien", page = 1, limit = 4 } = req.query;

    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;
    try {
        const tong = await Dichvu.countDocuments({ idDanhMucDV: id, trangThaiDV: 'Công khai' });
        const tongPage = Math.ceil(tong / pageSize);

        let sortQuery;
        switch (sort) {
            case 'phobien':
                sortQuery = { luotXem: -1 }; // Sắp xếp theo lượt xem (giảm dần)
                break;
            case 'moinhat':
                sortQuery = { createdAt: -1 }; // Sắp xếp theo ngày tạo (mới nhất)
                break;
            case 'nhieunguoidat':
                sortQuery = { soLuongDonHang: -1 }; // Sắp xếp theo số lượng đơn hàng (giảm dần)
                break;
            case 'giatang':
                sortQuery = { 'phanLoai.coban.giaLoai': 1 }; // Sắp xếp theo giá (tăng dần)
                break;
            case 'giagiam':
                sortQuery = { 'phanLoai.coban.giaLoai': -1 }; // Sắp xếp theo giá (tăng dần)
                break;
            default:
                sortQuery = { luotXem: -1 }; // Mặc định sắp xếp theo lượt xem (giảm dần)
                break;
        }

        const dichvu = await Dichvu.find({ idDanhMucDV: id, trangThaiDV: 'Công khai'})
        .populate("idNguoiDungDV")
        .populate("idDanhMucDV")
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize);

        if (dichvu.length === 0) {
            return res.status(404).json({ message: 'Không có dịch vụ công khai trong danh mục này' });
        }

        return res.status(200).json({
            tong,
            dichvu,
            tongPage,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi DichvutheoDM controller", error.message);
    }
};

export const layTheoNguoiDung = async (req, res) => {
    const id = req.nguoidung._id.toString();
    try {
        const dichvu = await Dichvu.find({ idNguoiDungDV: id });
        res.status(200).json(dichvu);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Error in layDichVu controller", error);
    }
};

export const capNhatLuotXem = async (req, res) => {
    const { id } = req.params; 
    try {   
        const dichVu = await Dichvu.findById(id);
        if (dichVu) {
            dichVu.luotXem += 1;
            await dichVu.save();
        } else {
            console.log('Dịch vụ không tồn tại');
        }
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi idDichVu controller", error.message);
    }
}

export const goiYTimKiem = async (req, res) => {
    const search = req.query.search;
    if (!search) {
        return res.status(400).send({ message: 'Vui lòng nhập từ tìm kiếm' });
    }
    try {
        const goiY = await Dichvu.find({
            tenDichVu: { $regex: search, $options: 'i' },
            trangThaiDV: 'Công khai'})
            .limit(5)
            .populate("idNguoiDungDV");
        res.json(goiY);
    } catch (err) {
        console.error('Lỗi trả về gợi ý:', err);
        res.status(500).send({ message: 'Server error' });
    }
};

export const timKiem = async (req, res) => { 
    const { search, sort = "phobien", page = 1, limit = 4 } = req.query;

    const pageSize = parseInt(limit);
    const skip = (page - 1) * pageSize;
    try {
        const tong = await Dichvu.countDocuments({
            tenDichVu: { $regex: search, $options: 'i' }, 
            trangThaiDV: 'Công khai'});
        const tongPage = Math.ceil(tong / pageSize);

        let sortQuery;
        switch (sort) {
            case 'phobien':
                sortQuery = { luotXem: -1 }; // Sắp xếp theo lượt xem (giảm dần)
                break;
            case 'moinhat':
                sortQuery = { createdAt: -1 }; // Sắp xếp theo ngày tạo (mới nhất)
                break;
            case 'nhieunguoidat':
                sortQuery = { soLuongDonHang: -1 }; // Sắp xếp theo số lượng đơn hàng (giảm dần)
                break;
            case 'giatang':
                sortQuery = { 'phanLoai.coban.giaLoai': 1 }; // Sắp xếp theo giá (tăng dần)
                break;
            case 'giagiam':
                sortQuery = { 'phanLoai.coban.giaLoai': -1 }; // Sắp xếp theo giá (tăng dần)
                break;
            default:
                sortQuery = { luotXem: -1 }; // Mặc định sắp xếp theo lượt xem (giảm dần)
                break;
        }

        const dichvu = await Dichvu.find({
            tenDichVu: { $regex: search, $options: 'i' }, 
            trangThaiDV: 'Công khai'})
        .populate("idNguoiDungDV")
        .populate("idDanhMucDV")
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize);

        if (dichvu.length === 0) {
            return res.status(404).json({ message: 'Không có dịch vụ công khai trong danh mục này' });
        }

        return res.status(200).json({
            tong,
            dichvu,
            tongPage,
        });
    } catch (error) {
        res.status(500).json({ error: "Lỗi 500" });
        console.log("Lỗi tim kiem controller", error.message);
    }
};