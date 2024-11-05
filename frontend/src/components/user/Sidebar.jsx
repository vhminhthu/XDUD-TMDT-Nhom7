import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <div className="avata flex items-center justify-center">
                <img 
                    src="https://placehold.co/60x60/FF69B4/FFFFFF" 
                    className="hidden md:block w-20 h-20 mx-2 rounded-full " 
                    alt="Avatar Large"
                />
            </div>
            <p className="flex justify-center mt-2">Mintu</p>
            <Link to={'/user/profile'}>
                <div className="avata flex items-center justify-center bg-slate-200 p-5 m-3">
                    Thông tin
                </div>
            </Link>
            <Link to={'/user/quanlydichvu/list'}>
                <div className="avata flex items-center justify-center bg-slate-300 p-5 m-3">
                    Quản lý dịch vụ
                </div>
            </Link>
        </>
    )
}

export default Sidebar