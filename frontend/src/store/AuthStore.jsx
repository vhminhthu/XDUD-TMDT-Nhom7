import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await Axios.get('/api/auth/getme'); 
        setAuthUser(response.data._id); 
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};
