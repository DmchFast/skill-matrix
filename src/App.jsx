import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import SkillDetail from './pages/SkillDetail';
import CreateSkill from './pages/CreateSkill';
import TakeTest from './pages/TakeTest';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="skills/:id" element={<SkillDetail />} />
        <Route
          path="create-skill"
          element={
            <PrivateRoute>
              <CreateSkill />
            </PrivateRoute>
          }
        />
        <Route
          path="skills/:id/test"
          element={
            <PrivateRoute>
              <TakeTest />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;