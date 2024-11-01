import mongoose from "mongoose";

const donhangSchema = new mongoose.Schema(
    {
        trangThaiDH:{
            type: String,
        },
        tongTien:{
            type: Number,
        },
        idDichVuDH:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "Dichvu",
        },
        khachHangId: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Nguoidung",
        },
        phuongThucThanhToan:{
            type: String,
        },
        trangThaiThanhToan:{
            type: String,
        },
        thoiGianThanhToan:{
            type: Date,
        },
    },
    { timestamps: true } 
);

const Donhang = mongoose.model("Donhang", donhangSchema);

export default Donhang;
