import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import SkillDetail from './pages/SkillDetail';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="skills/:id" element={<SkillDetail />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;