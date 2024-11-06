import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function CategoryDetail() {
    const { id } = useParams(); 
    const navigate = useNavigate()
    const [dichvus, setdichvu] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/api/dichvu/theodanhmuc/${id}`);
                const dichvuName = response.data.map(dichvu => ({
                    id: dichvu._id,
                    img: 'https://placehold.co/60x60/FF69B4/FFFFFF',
                    tenDichVu: dichvu.tenDichVu,
                    giaTien: dichvu.giaTien
                }));
                setdichvu(dichvuName); 
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchCategories();
    }, [id]);
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content'>
                <div className="grid grid-cols-3 gap-4 p-6">
                    {dichvus.map((dichvu) => (
                            <div
                                key={dichvu.id}
                                onClick={() => navigate(`/categories/dichvu/${dichvu.id}`)}
                                className="bg-white border border-gray-200 rounded-lg shadow p-4"
                            >
                                    <img
                                    src={dichvu.img}
                                    alt={dichvu.tenDichVu}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h2 className="text-lg font-bold mb-2">{dichvu.tenDichVu}</h2>
                                    <div className="flex items-center justify-between mb-2">
                                    <div className="text-xl font-semibold text-gray-700">
                                        ₫{dichvu.giaTien}
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CategoryDetail
