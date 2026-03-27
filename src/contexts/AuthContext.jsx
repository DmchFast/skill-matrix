import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
   }, []);

   const login = async (email, password) => {
      // Тестовый пользователь
      if (email === 'admin@mail.ru' && password === '123') {
         const userData = { id: 1, username: 'admin', email, role: 'admin' };
         setUser(userData);
         localStorage.setItem('user', JSON.stringify(userData));
         return true;
      }
      return false;
   };

   const register = async (username, email, password) => {
      const newUser = {
         id: Date.now(),
         username,
         email,
         role: 'user',
         bio: '',
         followers: [],
         following: [],
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
   };

   return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
         {children}
      </AuthContext.Provider>
   );
};