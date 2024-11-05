import './App.css'

import { Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Type from './pages/admin/Type';
import Profile from './pages/admin/Profile';
import UserTrangChu from './pages/user/UserTrangChu';
import YeuThich from './pages/user/YeuThich';
import FreelancerOverview from './pages/user/FreelancerOverview';
import FreelancerInfo from './pages/user/FreelancerInfo';
import CategoryDetail from './pages/user/CategoryDetail';
import UserProfile from './pages/user/Profile';

function App() {
  return (
    <Routes>
      {/* trang chinh */}
      <Route path="/" element={<UserTrangChu/>} />
      <Route path="/yeuthich" element={<YeuThich/>} />
      <Route path="/freelancer/overview" element={<FreelancerOverview/>} />
      <Route path="/freelancer/info" element={<FreelancerInfo/>} />
      <Route path="/categories/:id" element={<CategoryDetail/>} />
      <Route path="/user/profile" element={<UserProfile/>} />

      {/* trang admin */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/type" element={<Type/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  )
}


export default App
