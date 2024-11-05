import Header from "../../components/user/Header";
import CategoriesMenu from "../../components/user/CategoriesMenu";

function FreelancerOverview() {
    return (
        <div className='container'> 
            <div id="Header">
                <Header />
            </div>
            <div id="CategoriesMenu">
                <CategoriesMenu />
            </div>
            <div className='content'>
                Overview
            </div>

        </div>
    )
}

export default FreelancerOverview