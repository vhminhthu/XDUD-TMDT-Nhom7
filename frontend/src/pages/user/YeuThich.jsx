import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function YeuThich() {
    return (
        <div className="container mx-auto px-4">
            <div id="Header" className="mb-6">
                <Header />
            </div>
            
            <div id="CategoriesMenu" className="mb-8">
                <CategoriesMenu />
            </div>
            <div className='content'>
                Yêu thích
            </div>
        </div>
    )
}

export default YeuThich;