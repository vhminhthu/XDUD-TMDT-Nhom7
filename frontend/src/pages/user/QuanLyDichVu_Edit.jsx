import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function QuanLyDichVu_Edit() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        tenDichVu: '',
        moTaDV: '',
        giaTien: '',
        thoiGianHoanThanh: '',
        trangThaiDV: '',
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`/api/dichvu/lay/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
            }
        };
        fetchServiceData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/dichvu/chinh/${id}`, formData);
            alert("Cập nhật thành công!");
            navigate('/user/quanlydichvu/list');
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div id="Header" className="mb-6">
                <Header />
            </div>
            <div id="CategoriesMenu" className="mb-6">
                <CategoriesMenu />
            </div>
            <div className="content bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex justify-center">
                    Chỉnh sửa Dịch vụ
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Tên Dịch Vụ
                        </label>
                        <input
                            type="text"
                            name="tenDichVu"
                            value={formData.tenDichVu}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Mô tả dịch vụ
                        </label>
                        <input
                            type="text"
                            name="moTaDV"
                            value={formData.moTaDV}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Giá Tiền
                        </label>
                        <input
                            type="number"
                            name="giaTien"
                            value={formData.giaTien}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Thời Gian Hoàn Thành
                        </label>
                        <input
                            type="text"
                            name="thoiGianHoanThanh"
                            value={formData.thoiGianHoanThanh}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Trạng Thái
                        </label>
                        <input
                            type="text"
                            name="trangThaiDV"
                            value={formData.trangThaiDV}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    );
}

export default QuanLyDichVu_Edit;
