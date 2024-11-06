import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function CategoriesMenu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/danhmuc');
                const categoryNames = response.data.map(category => ({
                    id: category._id,
                    name: category.tenDM,
                    path: `/categories/${category._id}`
                }));
                setCategories(categoryNames); 
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="categories-menu-wrapper p-4 border-t border-b mt-2">
            <nav className="categories-menu-list flex flex-row items-center space-x-2 md:space-x-8 justify-center">
                <ul className="flex space-x-2 md:space-x-10">
                    {categories.map((category) => (
                        <li key={category.id} className="list-none">
                            <Link to={category.path} className="text-lg uppercase hover:border-b-4 hover:border-pink-600 hover:pb-4">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default CategoriesMenu;
