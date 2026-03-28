import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [skills, setSkills] = useState([]);

   const addSkill = (skill) => {
      setSkills(prev => [...prev, skill]);
   };

   return (
      <DataContext.Provider value={{ skills, addSkill }}>
         {children}
      </DataContext.Provider>
   );
};