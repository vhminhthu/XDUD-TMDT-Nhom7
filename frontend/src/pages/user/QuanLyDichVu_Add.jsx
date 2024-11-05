import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuanLyDichVu_Add() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tenDichVu: '',
        moTaDV: '',
        giaTien: '',
        thoiGianHoanThanh: '',
        trangThaiDV: '',
        idDanhMucDV: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/danhmuc');
                const categoryNames = response.data.map(category => ({
                    id: category._id,
                    name: category.tenDM,
                }));
                setCategories(categoryNames); 
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'idDanhMucDV') {
            console.log("ID danh mục được chọn:", value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.tenDichVu || !formData.moTaDV || !formData.giaTien || !formData.idDanhMucDV) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post('/api/dichvu/them', formData);
            if (response.status === 201) {
                alert("Thêm thành công!");
                navigate('/user/quanlydichvu/list');
            } else {
                alert("Có lỗi xảy ra khi thêm dịch vụ, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm dịch vụ:", error);
            alert("Lỗi khi thêm dịch vụ: " + (error.response?.data?.message || error.message));
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
                    Thêm dịch vụ
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
                            required
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
                            required
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
                            required
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
                            required
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
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Danh Mục
                        </label>
                        <select
                            name="idDanhMucDV"
                            value={formData.idDanhMucDV}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}

export default QuanLyDichVu_Add;
