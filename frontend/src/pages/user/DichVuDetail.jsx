import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";

function DichVuDetail() {
    const { id } = useParams(); 
    const [dichvu, setDichvu] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await Axios.get(`/api/dichvu/lay/${id}`);
                setDichvu(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải dịch vụ:", error);
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!dichvu) {
        return <div>Không tìm thấy dịch vụ.</div>;
    }

    return (
        <div className="container bg-white">
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <h1>{dichvu.tenDichVu}</h1>
            </div>
        </div>
    );
}

export default DichVuDetail;
