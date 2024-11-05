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
        <div className='content p-20'> 
            <Sidebar/>
            <div className="profile-content">
                
            </div>
        </div>

    </div>
    )
}

export default Profile