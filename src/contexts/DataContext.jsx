import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [skills, setSkills] = useState([]);
   const [users, setUsers] = useState([]);

   // Пример
   const addSkill = (skill) => {
      console.log('addSkill called', skill);
   };

   const updateSkill = (id, updated) => {
      console.log('updateSkill called', id, updated);
   };

   const deleteSkill = (id) => {
      console.log('deleteSkill called', id);
   };

   const updateUser = (id, updated) => {
      console.log('updateUser called', id, updated);
   };

   const deleteUser = (id) => {
      console.log('deleteUser called', id);
   };

   const followUser = (currentUserId, targetUserId) => {
      console.log('followUser called', currentUserId, targetUserId);
   };

   const unfollowUser = (currentUserId, targetUserId) => {
      console.log('unfollowUser called', currentUserId, targetUserId);
   };

   return (
      <DataContext.Provider value={{
         skills, users,
         addSkill, updateSkill, deleteSkill,
         updateUser, deleteUser,
         followUser, unfollowUser,
      }}>
         {children}
      </DataContext.Provider>
   );
};