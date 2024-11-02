import './App.css'

import { Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Type from './pages/admin/Type';
import Profile from './pages/admin/Profile';




function App() {
  return (
    <Routes>
      {/* trangchinh */}



      {/* trang admin */}
      <Route path="/admin" element={<Admin/>} />
      <Route path="/type" element={<Type/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  )
}


export default App
