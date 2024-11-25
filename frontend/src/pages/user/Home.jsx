/* import CategoriesMenu from "../../components/user/CategoriesMenu";
import Footer from "../../components/user/Footer"; */
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";

function Home() {
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
            <div className='content'>
                Trang chủ
            </div>
        </div>
    )
}

export default Home;
