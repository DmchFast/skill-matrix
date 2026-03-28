import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import ProfileDetail from './pages/ProfileDetail';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
import SkillDetail from './pages/SkillDetail';
import CreateSkill from './pages/CreateSkill';
import TakeTest from './pages/TakeTest';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="profiles/:id" element={<ProfileDetail />} />
        <Route path="my-profile" element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        } />
        <Route path="edit-profile" element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        } />
        <Route path="skills/:id" element={<SkillDetail />} />
        <Route path="create-skill" element={
          <PrivateRoute>
            <CreateSkill />
          </PrivateRoute>
        } />
        <Route path="skills/:id/test" element={
          <PrivateRoute>
            <TakeTest />
          </PrivateRoute>
        } />
        <Route path="admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;