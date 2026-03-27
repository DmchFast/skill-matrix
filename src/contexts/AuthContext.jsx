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
      // Проверка
      const mockUser = { id: 1, username: 'user', email, role: 'user' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
   };

   const register = async (username, email, password) => {
      const mockUser = { id: Date.now(), username, email, role: 'user' };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
   };

   const updateCurrentUser = (updatedData) => {
      if (!user) return;
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
   };

   return (
      <AuthContext.Provider value={{ user, login, register, logout, updateCurrentUser }}>
         {children}
      </AuthContext.Provider>
   );
};