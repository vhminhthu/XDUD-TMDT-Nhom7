import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";
import GioHang from '../../components/user/GioHang';
import { FaRegClock } from "react-icons/fa";

function DichVuDetail() {
    const { id } = useParams();
    const [dichvu, setDichvu] = useState(null);
    const [user, setUser] = useState(null);
    const [danhmuc, setDanhmuc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPackage, setSelectedPackage] = useState('coban');
    const [hienthiGiohang, setHienthiGiohang] = useState(false);

    const handleClickOutside = (event) => {
        if (!event.target.closest('.giohang_button') && !event.target.closest('#giohang')) {
            setHienthiGiohang(false);
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        fetchProductDetails(id);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [id]);

    useEffect(() => {
        if (dichvu) {
            fetchUserData(dichvu.idNguoiDungDV);
            fetchDanhmucData(dichvu.idDanhMucDV);
        }
    }, [dichvu]);

    const handlePackageChange = (packageType) => {
        setSelectedPackage(packageType);
    };

    const fetchProductDetails = async (id) => {
        try {
            const response = await Axios.get(`/api/dichvu/lay/${id}`);
            setDichvu(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi tải dịch vụ:", error);
            setLoading(false);
        }
    };

    const fetchUserData = async (idND) => {
        try {
            const response = await Axios.get(`/api/user/layTheoId/${idND}`);
            setUser(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDanhmucData = async (idDM) => {
        try {
            const response = await Axios.get(`/api/danhmuc/layTheoId/${idDM}`);
            setDanhmuc(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleAddToCart = async () => {
        if (!dichvu) return;
    
        const service = {
            dichVuId: dichvu._id,
            phanLoai: dichvu.phanLoai?.[selectedPackage],
            soLuong: 1,
        };
    
        try {
            await Axios.post('/api/giohang/them', service);
            setHienthiGiohang(prev => !prev);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };
    

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (!dichvu) {
        return <div className="text-center py-12">Không tìm thấy dịch vụ.</div>;
    }
    
    return (
        <div className="containe min-h-screen">
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className="container mx-auto p-4 flex justify-around">
                <div className='w-full pt-10 pr-12 pl-9'>
                    <nav className="text-sm text-gray-600 mb-4">
                        <a className="hover:underline capitalize mr-1" href="#">
                            {danhmuc?.tenDM || 'Tên danh mục'}
                        </a>
                        / 
                        <a className="hover:underline capitalize ml-1" href="#">
                            {dichvu.tenDichVu}
                        </a>
                    </nav>
                    <h1 className="text-4xl font-bold mb-2">
                        {dichvu.tenDichVu}
                    </h1>
                    <div className="flex items-start mt-5">
                        <img
                        alt="Profile picture of the developer" 
                        className="rounded-full w-16 h-16 mr-4" 
                        src={user?.anhND ? user.anhND : "https://placehold.co/20x20/FF69B4/FFFFFF"}
                        />
                        <div>
                            <h3 className="text-xl font-bold">
                                {user?.tenNguoiDung || 'Tên người dùng'}
                            </h3>
                            <div className="flex items-center mb-2">
                                <span className="text-yellow-500">
                                    <i className="fas fa-star">
                                    </i>
                                    5.0
                                </span>
                                <span className="ml-2 text-gray-600">
                                    (95)
                                </span>
                            </div>
                            <div>
                                {dichvu.kyNang.map((kynang, index) => (
                                    <span key={index} className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
                                        {kynang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <img
                            src={dichvu.anhDichVu || 'https://placehold.co/100x300/FF69B4/FFFFFF'}
                            alt={dichvu.tenDichVu || 'Dich vu image'}
                            className="w-full h-80 object-cover rounded-t-lg"
                        />
                    </div>
                    <div className='mt-5'>
                        <h2 className="text-xl font-bold">
                            Mô tả về dịch vụ
                        </h2>
                        <p className="mt-4 text-gray-800">
                            {dichvu.moTaDV}
                        </p>
                    </div>
                </div>

                <div className="pt-10 pr-12">
                    <div>

                    </div>
                    <div className="items-center border p-7 w-96">
                        <div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className={`px-4 py-2 ${selectedPackage === 'coban' ? 'bg-pink-600 text-white' : 'bg-pink-100'} `}
                                    onClick={() => handlePackageChange('coban')}
                                >
                                    CƠ BẢN
                                </button>
                                <button
                                    className={`px-4 py-2 ${selectedPackage === 'thuong' ? 'bg-pink-600 text-white' : 'bg-pink-100'} `}
                                    onClick={() => handlePackageChange('thuong')}
                                >
                                    THƯỜNG
                                </button>
                                <button
                                    className={`px-4 py-2 ${selectedPackage === 'nangcao' ? 'bg-pink-600 text-white' : 'bg-pink-100'} `}
                                    onClick={() => handlePackageChange('nangcao')}
                                >
                                    NÂNG CAO
                                </button>
                            </div>
                            <div className="mt-4">
                                <div className='flex justify-between mt-7 mb-7'>
                                    <p className='text-xl w-2/3 font-bold'>{dichvu.phanLoai?.[selectedPackage]?.tenLoai}</p>
                                    <p className="text-lg ">
                                        {dichvu.phanLoai?.[selectedPackage]?.giaLoai?.toLocaleString()} đ
                                    </p>
                                </div>
                                <p className="text-gray-800 mt-3">{dichvu.phanLoai?.[selectedPackage]?.moTaLoai}</p>
                                <p className="text-gray-600 mt-7 flex items-center">
                                    <FaRegClock className='mr-2'/> {dichvu.phanLoai?.[selectedPackage]?.thoiGianDuKien}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="giohang_button mt-3 px-4 py-2 bg-pink-600 text-white rounded w-80"
                        >
                            THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-pink-100 text-gray-800 rounded w-full">
                        Liên hệ với tôi
                        <i className="fas fa-chevron-down">
                        </i>
                    </button>
                </div>
            </div>
            {hienthiGiohang && (
                <GioHang/>
            )}
        </div>
    );
}

export default DichVuDetail;
