import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/ComponentLading';
import SimpleLoginComponent from './components/ComponentLogin';
import Register from './components/ComponentRegister';
import Dashboard from './components/ComponentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SimpleLoginComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;