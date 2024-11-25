import {HiOutlineBell , HiOutlineMail, HiOutlineHeart ,HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query'; 
import { useNavigate } from 'react-router-dom';
import HeaderDonHang from "./HeaderDonHang";

function Header() {
    const [hienthiThongBao, setHienThiThongBao] = useState(false);
    const [hienthiTinNhan, setHienThiTinNhan] = useState(false);
    const [hienthiDonHang, setHienThiDonHang] = useState(false);
    const [hienthiNguoiDung, setHienThiNguoiDung] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient(); 
    const navigate = useNavigate(); 


    const xulyThongBao = () => {
        setHienThiThongBao(prev => !prev);
    };

    const xulyTinNhan = () => {
        setHienThiTinNhan(prev => !prev);
    };

    const xulyGioHang = () => {
        setHienThiDonHang(prev => !prev);
    };

    const xulyNguoiDung = () => {
        setHienThiNguoiDung(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.thongbao_button') && !event.target.closest('#Thongbao')) {
            setHienThiThongBao(false);
        }
        if (!event.target.closest('.tinnhan_button') && !event.target.closest('#Tinnhan')) {
            setHienThiTinNhan(false);
        }
        if (!event.target.closest('.giohang_button') && !event.target.closest('#Donhang')) {
            setHienThiDonHang(false);
        }
        if (!event.target.closest('.nguoidung_button') && !event.target.closest('#Nguoidung')) {
            setHienThiNguoiDung(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        fetchUserData();
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/auth/getme');
            setUser(response.data);
        } catch (err) {
            setError('Không thể lấy thông tin người dùng. Vui lòng thử lại.');
            console.error(err);
        }
    };

    const handleDangXuat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/logout');
            console.log(response.data);

            // Gọi invalidateQueries sau khi đăng xuất thành công để cập nhật dữ liệu
            queryClient.invalidateQueries('authUser'); // Hoặc tên truy vấn bạn đang sử dụng để lưu thông tin người dùng
            navigate('/dangky'); // Chuyển hướng tới trang đăng ký
            } catch (error) {
            if (error.response) {
                console.error('Lỗi từ server:', error.response.data);
            } else {
                console.error('Lỗi không xác định:', error.message);
            }
        }
    };

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="flex justify-center items-center mt-4"><div className="loader">Đang tải...</div></div>;

    return (
        <div className="header-row-wrapper">
            <div className="flex items-center justify-between mx-auto px-4 py-2">
                <Link to={'/'} className="md:text-2xl font-bold cursor-pointer text-pink-600">BOOKING.</Link>
                <div className="flex items-center w-full max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="md:w-screen md:px-3 px-1 w-full md:py-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>
                <nav>
                    <ul className="flex md:space-x-6 items-center md:flex space-x-1">
                        <li>
                            <div className="thongbao_button text-lg md:text-xl cursor-pointer hover:text-pink-600" onClick={xulyThongBao}>
                                <HiOutlineBell />
                            </div>
                        </li>
                        <li>                                   
                            <div className="tinnhan_button text-lg md:text-xl cursor-pointer hover:text-pink-600" onClick={xulyTinNhan}>
                                <HiOutlineMail />
                            </div>
                        </li>
                        <li>
                            <Link to="/yeuthich" className="text-lg md:text-xl cursor-pointer hover:text-pink-600">
                                <HiOutlineHeart />
                            </Link>
                        </li>
                        <li>
                            <div className="giohang_button text-lg md:text-xl cursor-pointer hover:text-pink-600" onClick={xulyGioHang}>
                                <HiOutlineShoppingCart />
                            </div>
                        </li>
                        <li>
                            <div className="nguoidung_button flex items-center rounded-full cursor-pointer" onClick={xulyNguoiDung}>
                                <div className="header-avata flex items-center">
                                    <img 
                                        src="https://placehold.co/40x40/FF69B4/FFFFFF" 
                                        className="block md:hidden w-5 h-5 mx-2 rounded-full " 
                                        alt="Avatar Small"
                                    />
                                    <img 
                                        src="https://placehold.co/60x60/FF69B4/FFFFFF" 
                                        className="hidden md:block w-10 h-10 mx-2 rounded-full " 
                                        alt="Avatar Large"
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

            </div>

            <div>
                {hienthiThongBao && (
                    <div id="Thongbao" className="absolute right-5 w-64 bg-white border rounded shadow-lg z-50">
                        <div className="border-b px-4 py-2">
                            <h2 className="text-lg font-semibold">Thông báo (1)</h2>
                        </div>
                        <div className="p-4 flex items-start space-x-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-700">Thông báo 1</p>
                                <p className="text-xs text-gray-500 mt-1">3 ngày trước</p>
                            </div>
                        </div>
                    </div>
                )}

                {hienthiTinNhan && (
                    <div id="Tinnhan" className="absolute right-5 w-64 bg-white border rounded shadow-lg z-50">
                        <div className="border-b px-4 py-2">
                            <h2 className="text-lg font-semibold">Tin nhắn (1)</h2>
                        </div>
                        <div className="p-4 flex items-start space-x-4 justify-center">
                            <p>Chưa có tin nhắn nào</p>
                        </div>
                    </div>
                )}

                {hienthiDonHang && (
                    <HeaderDonHang/>
                )}

                {hienthiNguoiDung && (
                    <div id="Nguoidung" className="absolute right-5 w-64 bg-white border rounded shadow-lg z-50">
                        <div className="px-4 py-2">
                            <div className="flex flex-col">
                                <Link to={'/user/profile'} className="text-lg mb-2 text-gray-700 hover:text-pink-600">Hồ sơ</Link>
                                {user.vaiTro === "freelancer" && (
                                    <Link to={'/user/quanlydondathang/list'} className="text-lg mb-2 text-gray-700 hover:text-pink-600">Yêu cầu đặt hàng</Link>
                                )}
                            </div>
                        </div>
                        <div className="border-t px-4 py-2">
                            {user.vaiTro === "user" && (
                                <Link to={'/freelancer/overview'} className="text-lg mb-2 text-gray-700 hover:text-pink-600">Trở thành Freelancer</Link>
                            )}
                            <p className="text-lg text-gray-700 hover:text-pink-600 cursor-pointer">Cài đặt</p>
                        </div>
                        <div className="border-t px-4 py-2">
                            <p className="text-lg text-gray-700 hover:text-pink-600 cursor-pointer" onClick={handleDangXuat}>Đăng xuất</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header;
