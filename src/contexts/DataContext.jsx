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
         addSkill, getSkill, updateSkill,
         updateUser,
         followUser, unfollowUser,
      }}>
         {children}
      </DataContext.Provider>
   );
};