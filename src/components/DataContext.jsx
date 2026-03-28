import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [skills, setSkills] = useState([]);

   const addSkill = (skill) => {
      setSkills(prev => [...prev, skill]);
   };

   const getSkill = (id) => {
      return skills.find(s => s.id === id);
   };

   // Заглушка для обновления инф
   const updateSkill = (id, updated) => {
      setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
   };

   return (
      <DataContext.Provider value={{ skills, addSkill, getSkill, updateSkill }}>
         {children}
      </DataContext.Provider>
   );
};