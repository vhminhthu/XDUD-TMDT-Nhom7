import { useParams } from 'react-router-dom';
/* import { useState, useEffect } from "react";
import axios from 'axios'; */

import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function CategoryDetail() {
    const { id } = useParams(); 
/*     const [dichvu, setdichvu] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/dichvu/:id');
                const dichvuName = response.data.map(dichvu => ({
                    id: dichvu._id,
                    name: dichvu.tenDichVu,
                    path: `/categories/${dichvu._id}`
                }));
                setdichvu(dichvuName); 
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchCategories();
    }, []); */
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content'>
                Danh mục {id}
            </div>

        </div>
    )
}

export default CategoryDetail
