import mongoose from "mongoose";

const dichvuSchema = new mongoose.Schema(
    {
        tenDichVu:{
            type: String,
        },
        moTaDV:{
            type: String,
        },
        giaTien:{
            type: Number,
        },
        kyNang:[
            {
                type: String,
            },
        ],
        thoiGianHoanThanh:{
            type: String,
        },
        idDanhMucDV:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Danhmuc",
        },
        idNguoiDungDV:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
        },
        trangThaiDV:{
            type: String,
        },
        danhSachDanhGia:[
			{
				soSao: {
					type: Number,
					required: true,
				},
                noiDung: {
					type: String,
					required: true,
                },
				idNguoiDungDG: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Nguoidung",
					required: true,
				},
                ngayDanhGia: { 
                    type: Date, 
                    default: Date.now,
                }
			},
		],
    },
    { timestamps: true } 
);

const Dichvu = mongoose.model("Dichvu", dichvuSchema);

export default Dichvu;
