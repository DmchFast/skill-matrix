import { createContext, useState } from 'react';
import { mockUsers } from '../mockData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [skills, setSkills] = useState([]);
   const [users, setUsers] = useState(mockUsers);

   const addSkill = (skill) => {
      setSkills(prev => [...prev, skill]);
   };

   const getSkill = (id) => {
      return skills.find(s => s.id === id);
   };

   const updateSkill = (id, updated) => {
      setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
   };

   const updateUser = (id, updated) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
   };

   return (
      <DataContext.Provider value={{ skills, users, addSkill, getSkill, updateSkill, updateUser }}>
         {children}
      </DataContext.Provider>
   );
};