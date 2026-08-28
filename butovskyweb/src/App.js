import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Убедитесь, что регистр букв совпадает с именем файла!
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Маршрут для логина */}
          <Route path="/login" element={<Login />} />
          
          {/* Перенаправление с главной страницы на /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;