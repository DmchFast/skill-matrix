import { createContext, useState } from 'react';

// Пользователи
const mockUsers = [
   {
      id: 1,
      username: 'admin',
      email: 'admin@mail.ru',
      role: 'admin',
      bio: 'Главный администратор платформы',
      avatar: null,
      followers: [2],
      following: [3],
      completedSkills: [101],
      createdAt: '2026-01-01T10:00:00Z',
   },
   {
      id: 2,
      username: 'matvey_rts',
      email: 'mat@mail.ru',
      role: 'user',
      bio: 'Дизайнер интерфейсов',
      avatar: null,
      followers: [],
      following: [1],
      completedSkills: [],
      createdAt: '2026-02-15T08:30:00Z',
   },
   {
      id: 3,
      username: 'alexsey_dem',
      email: 'alex@mail.ru',
      role: 'user',
      bio: 'Люблю программировать и изучать новое',
      avatar: null,
      followers: [1],
      following: [],
      completedSkills: [102],
      createdAt: '2026-03-20T14:15:00Z',
   },
];

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