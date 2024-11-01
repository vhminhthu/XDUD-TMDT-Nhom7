import mongoose from "mongoose";

const danhmucSchema = new mongoose.Schema(
    {
        tenDM:{
            type: String,
        },
        idDichVuDM:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Dichvu",
            },
        ],
    },
    { timestamps: true } 
);

const Danhmuc = mongoose.model("Danhmuc", danhmucSchema);

export default Danhmuc;
