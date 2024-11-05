/* import CategoriesMenu from "../../components/user/CategoriesMenu";
import Footer from "../../components/user/Footer"; */
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Header from "../../components/user/Header";

function Home() {
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content'>
                Trang chủ
            </div>
        </div>
    )
}

export default Home;
