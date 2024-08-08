import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIN, setIsLoggedIN] = useState(false);
  const [key, setKey] = useState(0);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
      setIsLoggedIN(true);
      let token = localStorage.getItem('token');
      setDecodedToken(jwtDecode(token));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIN(false);
    setDecodedToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIN, key, decodedToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
