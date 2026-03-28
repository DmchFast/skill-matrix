import { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../mockData';

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
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
         const { password: _, ...userWithoutPassword } = foundUser;
         setUser(userWithoutPassword);
         localStorage.setItem('user', JSON.stringify(userWithoutPassword));
         return true;
      }
      return false;
   };

   const register = async (username, email, password) => {
      if (mockUsers.some(u => u.email === email)) return false;
      const newUser = {
         id: Date.now(),
         username,
         email,
         password,
         role: 'user',
         bio: '',
         avatar: null,
         followers: [],
         following: [],
         completedSkills: [],
         createdAt: new Date().toISOString(),
      };
      mockUsers.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
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
      const index = mockUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
         mockUsers[index] = { ...mockUsers[index], ...updatedData };
      }
   };

   return (
      <AuthContext.Provider value={{ user, login, register, logout, updateCurrentUser }}>
         {children}
      </AuthContext.Provider>
   );
};