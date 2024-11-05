import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function YeuThich() {
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content'>
                Yêu thích
            </div>

        </div>
    )
}

export default YeuThich;