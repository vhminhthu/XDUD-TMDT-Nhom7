import mongoose from "mongoose";

const tinnhanSchema = new mongoose.Schema(
	{
		idNguoiDungGui: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
        idNguoiDungNhan: {
			type: mongoose.Schema.Types.ObjectId,
            ref: "Nguoidung",
		},
        noiDungTN: {
			type: Number,
            required: true,
		},
	},
	{ timestamps: true }
);

const Tinnhan = mongoose.model("Tinnhan", tinnhanSchema);

export default Tinnhan;