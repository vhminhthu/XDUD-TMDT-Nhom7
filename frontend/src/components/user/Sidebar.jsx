import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="flex justify-center items-center mt-4"><div className="loader">Đang tải...</div></div>; 

    return (
        <>
            <div className="avata flex items-center justify-center">
                <img 
                    src="https://placehold.co/60x60/FF69B4/FFFFFF" 
                    className="w-20 h-20 mx-2 rounded-full shadow-lg border-2 border-white" 
                    alt="Avatar"
                />
            </div>
            <p className="text-center text-lg font-semibold mt-3">{user.tenNguoiDung}</p>
            <Link to={'/user/profile'}>
                <div className="flex justify-center items-center bg-pink-200 hover:bg-pink-100 rounded-lg p-4 mt-10 shadow-md cursor-pointer transition duration-200 ease-in-out">
                    <span className="text-gray-700">Thông tin</span>
                </div>
            </Link>
            {user.vaiTro === "freelancer" && (
                <>
                    <Link to={'/user/quanlydichvu/list'}>
                        <div className="flex justify-center items-center bg-pink-200 hover:bg-pink-100 rounded-lg p-4 mt-3 shadow-md cursor-pointer transition duration-200 ease-in-out">
                            <span className="text-gray-700">Quản lý dịch vụ</span>
                        </div>
                    </Link>

                    <Link to={'/user/quanlydondathang/list'}>
                        <div className="flex justify-center items-center bg-pink-200 hover:bg-pink-100 rounded-lg p-4 mt-3 shadow-md cursor-pointer transition duration-200 ease-in-out">
                            <span className="text-gray-700">Quản lý đơn hàng</span>
                        </div>
                    </Link>
                </>
            )}
        </>
    )
}

export default Sidebar;
