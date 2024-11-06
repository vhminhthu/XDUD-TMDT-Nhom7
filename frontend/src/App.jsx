import './App.css'

import { Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Type from './pages/admin/Type';
import Profile from './pages/admin/Profile';
import Home from './pages/user/Home';
import YeuThich from './pages/user/YeuThich';
import FreelancerOverview from './pages/user/FreelancerOverview';
import FreelancerInfo from './pages/user/FreelancerInfo';
import CategoryDetail from './pages/user/CategoryDetail';
import UserProfile from './pages/user/Profile';
import QuanLyDichVu from './pages/user/QuanLyDichVu';
import QuanLyDichVu_Edit from './pages/user/QuanLyDichVu_Edit';
import QuanLyDichVu_Add from './pages/user/QuanLyDichVu_Add';
import DichVuDetail from './pages/user/DichVuDetail';

function App() {
  return (
    <Routes>
      {/* trang chinh */}
      <Route path="/" element={<Home/>} />
      <Route path="/yeuthich" element={<YeuThich/>} />
      <Route path="/freelancer/overview" element={<FreelancerOverview/>} />
      <Route path="/freelancer/info" element={<FreelancerInfo/>} />
      <Route path="/categories/:id" element={<CategoryDetail/>} />
      <Route path="/user/profile" element={<UserProfile/>} />
      <Route path="/user/quanlydichvu/list" element={<QuanLyDichVu/>} />
      <Route path="/user/quanlydichvu/list/:id/edit" element={<QuanLyDichVu_Edit/>} />
      <Route path="/user/quanlydichvu/list/add" element={<QuanLyDichVu_Add/>} />
      <Route path="/categories/dichvu/:id" element={<DichVuDetail/>} />

      {/* trang admin */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/type" element={<Type/>} />
      <Route path="/adminprofile" element={<Profile/>} />
    </Routes>
  )
}


export default App
