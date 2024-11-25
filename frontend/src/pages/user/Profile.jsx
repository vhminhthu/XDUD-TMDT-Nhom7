import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Sidebar from "../../components/user/Sidebar";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng
        const fetchUserData = async () => {
            try {
            const response = await axios.get('/api/auth/getme');
            setUser(response.data);
            } catch (err) {
            setError('Không thể lấy thông tin người dùng. Vui lòng thử lại.');
            console.error(err);
            }
        };
    
        fetchUserData();
    }, []);

    if (error) return <div>{error}</div>;
    if (!user) return <div>Đang tải...</div>;
    return (
        <div className='container mx-auto px-4'> 
            <div id="Header" className="mb-6">
                <Header />
            </div>
            <div id="CategoriesMenu" className="mb-8">
                <CategoriesMenu />
            </div>
            <div className='content p-8 flex'> 
                <div className="profile-sidebar bg-pink-300 w-1/4 p-4 rounded-lg shadow-lg">
                    <Sidebar/>
                </div>
                <div className="profile-content w-3/4 ml-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Thông tin người dùng</h1>
                    <p className="text-xl text-gray-700 mb-4">Tên: <span className="font-semibold text-pink-600">{user.tenNguoiDung}</span></p>
                    <p className="text-xl text-gray-700 mb-4">Email: <span className="font-semibold text-pink-600">{user.email}</span></p>
                    <p className="text-xl text-gray-700 mb-4">
                        {user.soDienThoai && (
                            <>
                                Số điện thoại: <span className="font-semibold text-pink-600">{user.soDienThoai}</span>
                            </>
                        )}
                    </p>
                    <p className="text-xl text-gray-700 mb-4">
                        {user.diaChi && (
                            <>
                                Địa chỉ: <span className="font-semibold text-pink-600">{user.diaChi}</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Profile