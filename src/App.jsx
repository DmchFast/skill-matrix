import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import SkillDetail from './pages/SkillDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="skills/:id" element={<SkillDetail />} />
      </Route>
    </Routes>
  );
}

export default App;