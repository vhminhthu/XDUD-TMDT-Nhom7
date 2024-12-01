import './App.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Dangky from './pages/user/DangKy';
import Dangnhap from './pages/user/DangNhap';
import PaymentResult from './pages/user/PaymentResult';
import QuanLyDonDatHang from './pages/user/QuanLyDonDatHang';
import QuanLyDonHang from './pages/user/QuanLyDonHang';
import TimKiemDichVu from './pages/user/TimKiemDichVu';

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/auth/getme');
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* trang chinh */}
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/dangky" />} />
      <Route path="/user/:ten/yeuthich" element={<YeuThich/>} />
      <Route path="/freelancer/overview" element={<FreelancerOverview/>} />
      <Route path="/freelancer/info" element={<FreelancerInfo/>} />

      <Route path="/categories/:tn" element={<CategoryDetail/>} />

      <Route path="/:nd/:tndv" element={<DichVuDetail/>} />

      <Route path="/search/dichvu" element={<TimKiemDichVu/>} />

      <Route path="/user/profile" element={<UserProfile/>} />
      <Route path="/user/quanlydichvu/list" element={<QuanLyDichVu/>} />
      <Route path="/user/quanlydichvu/list/:id/edit" element={<QuanLyDichVu_Edit/>} />
      <Route path="/user/quanlydichvu/list/add" element={<QuanLyDichVu_Add/>} />
      <Route path="/user/quanlydondathang/list" element={<QuanLyDonDatHang/>} />
      <Route path="/user/quanlydonhang/list" element={<QuanLyDonHang/>} />

      <Route path="/payment-result" element={<PaymentResult />} />

      {/* Trang đăng nhập và đăng ký */}
      <Route path="/dangky" element={!authUser ? <Dangky /> : <Navigate to="/" />} />
      <Route path="/dangnhap"  element={!authUser ? <Dangnhap /> : <Navigate to="/" />} />

      {/* trang admin */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/type" element={<Type/>} />
      <Route path="/adminprofile" element={<Profile/>} />
    </Routes>
  )
}


export default App
