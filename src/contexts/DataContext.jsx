import { createContext, useState, useEffect } from 'react';
import { mockUsers, mockSkills } from '../mockData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [skills, setSkills] = useState([]);
   const [users, setUsers] = useState([]);

   useEffect(() => {
      setSkills(mockSkills);
      setUsers(mockUsers);
   }, []);

   const addSkill = (skill) => {
      setSkills(prev => [...prev, skill]);
   };

   const updateSkill = (id, updated) => {
      setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
   };

   const deleteSkill = (id) => {
      setSkills(prev => prev.filter(s => s.id !== id));
   };

   const updateUser = (id, updated) => {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
   };

   const deleteUser = (id) => {
      setUsers(prev => prev.filter(u => u.id !== id));
   };

   const followUser = (currentUserId, targetUserId) => {
      setUsers(prev => prev.map(u => {
         if (u.id === targetUserId) {
            const followers = u.followers.includes(currentUserId) ? u.followers : [...u.followers, currentUserId];
            return { ...u, followers };
         }
         if (u.id === currentUserId) {
            const following = u.following.includes(targetUserId) ? u.following : [...u.following, targetUserId];
            return { ...u, following };
         }
         return u;
      }));
   };

   const unfollowUser = (currentUserId, targetUserId) => {
      setUsers(prev => prev.map(u => {
         if (u.id === targetUserId) {
            const followers = u.followers.filter(id => id !== currentUserId);
            return { ...u, followers };
         }
         if (u.id === currentUserId) {
            const following = u.following.filter(id => id !== targetUserId);
            return { ...u, following };
         }
         return u;
      }));
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