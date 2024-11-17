import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function CategoryDetail() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [dichvu, setDichvu] = useState([]); 
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDanhmucData = async () => {
            try {
                const response = await axios.get(`/api/dichvu/theodanhmuc/${id}`);
                setDichvu(response.data);
                response.data.forEach(dv => {
                    fetchUserData(dv.idNguoiDungDV, dv._id);
                });
            } catch (err) {
                console.error(err);
                setError("Lỗi tải dịch vụ");
            } finally {
                setLoading(false);
            }
        };

        fetchDanhmucData();
    }, [id]);

    const fetchUserData = async (idND, dvId) => {
        try {
            const response = await axios.get(`/api/user/layTheoId/${idND}`);
            setUsers(prevUsers => ({ ...prevUsers, [dvId]: response.data })); 
        } catch (err) {
            console.error(err);
            setError("Failed to load user data.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            {/* Header */}
            <div id="Header" className="mb-6">
                <Header />
            </div>
            
            {/* Categories Menu */}
            <div id="CategoriesMenu" className="mb-8">
                <CategoriesMenu />
            </div>

            <div className="content">
                {dichvu.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg font-medium">
                        Không có dịch vụ nào trong danh mục này.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {dichvu.map((dv) => (
                            <div
                                key={dv._id}
                                onClick={() => navigate(`/categories/dichvu/${dv._id}`)}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
                            >
                                <img
                                    src={dv.anhDichVu || 'https://placehold.co/60x60/FF69B4/FFFFFF'}
                                    alt={dv.tenDichVu || 'Dich vu image'}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <div className='flex mb-3'>
                                        <img
                                            alt="Profile picture" 
                                            className="rounded-full w-6 h-6 mr-2" 
                                            src={users[dv._id]?.anhND || "https://placehold.co/20x20/FF69B4/FFFFFF"}
                                        />
                                        <h1 className='text-lg font-semibold'>{users[dv._id]?.tenNguoiDung || "Tên người dùng không có"}</h1>
                                    </div>
                                    <h2 className="text-lg text-gray-800 mb-2 capitalize">{dv.tenDichVu}</h2>
                                    <div className="flex items-center justify-between">
                                        <div className="text-xl font-bold text-green-600">
                                            Từ {dv.phanLoai?.coban?.giaLoai?.toLocaleString() || 'N/A'} đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryDetail;
