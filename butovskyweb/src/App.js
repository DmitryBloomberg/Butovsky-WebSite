import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; 
import News from './components/News';
import Dashboard from './components/Dashboard';
import ButovskyVPN from './components/ButovskyVPN';
import Error from './components/error';
import BPAY from './components/BPAY';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/news" element={< News/>} />
          <Route path="/dashboard" element={< Dashboard />} />

          <Route path="/dashboard/butovskyvpn" element={< ButovskyVPN />} />
          <Route path="/dashboard/error" element={< Error />} />
          <Route path="/dashboard/bpay" element={< BPAY />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;