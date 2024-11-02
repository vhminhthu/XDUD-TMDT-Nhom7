
import { Link } from "react-router-dom"
import AdminNav from "../../components/AdminNav"

export const Admin = () => {
  return (
    <>
    <AdminNav>
  <div className="ml-24 flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 bg-neutral-100 shadow-md">
          <h1 className="text-lg font-bold text-gray-500">DASHBOARD</h1>
          <div className="flex items-center">
            <button className="mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            </button>
            <div className="flex items-center">
              <button> 
                <Link to="/profile">
                <img src="https://via.placeholder.com/40" alt="profile" className="w-10 h-10 rounded-full mr-2" />
                </Link>
                </button>
              <div>
               <p className="text-gray-800 font-semibold">Pham Tien</p>
               <p className="text-gray-500 text-sm">Admin</p>              
              </div>
            </div>
          </div>
        </div>


        <div className="flex-1 p-4  overflow-hidden">
          <div className="flex-auto grid grid-cols-3 gap-3 pb-5">
          <div className="bg-white shadow  rounded-lg p-2 h-40"></div>
          <div className="bg-white shadow  rounded-lg p-2 h-40"></div>
          <div className="bg-white shadow  rounded-lg p-2 h-40"></div>
          </div>
       
         

        <div className="flex-auto grid grid-cols-2 gap-3 pb-3">
        <div className="bg-white shadow rounded-lg  h-64"></div>
        <div className="bg-white shadow rounded-lg  h-64 "></div>
        </div>
        </div>
    </div>  
    </AdminNav>

    </>
  )
}
export default Admin