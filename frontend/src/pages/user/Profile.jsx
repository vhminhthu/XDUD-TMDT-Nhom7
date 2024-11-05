import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";
import Sidebar from "../../components/user/Sidebar";

function Profile() {
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content p-8 flex'> 
                <div className="profile-sidebar bg-pink-300 w-1/4 p-4 rounded-lg shadow-lg">
                    <Sidebar/>
                </div>
                <div className="profile-content w-3/4 ml-8 p-4 bg-white rounded-lg shadow-lg">
                    
                </div>
            </div>
        </div>
    )
}

export default Profile