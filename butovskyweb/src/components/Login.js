import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login/login.css';
import './styles/login/login-body.css';

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    telegram_id: '', // Изменили name для соответствия бэкенду
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверка сессии при загрузке страницы
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth-check', {
          method: 'GET',
          credentials: 'include', // Важно для отправки cookies
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          navigate('/dashboard');
        }
      } catch (err) {
        console.warn('Сервер недоступен или ошибка проверки:', err);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { telegram_id: formData.telegram_id, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Обязательно для работы с cookies
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Произошла ошибка');
      }

      // Успех -> переход на дашборд
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ telegram_id: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="login-container">
      <div className='login-Head'>
        <h1>Butovsky</h1>
        <div className='login-Head-mini'>
          <h3 onClick={() => window.location.href = 'https://t.me/DmitryBloomberg'}>Поддержка</h3>
          <h3 onClick={() => window.location.href = 'https://t.me/ButovskyVPNChannel'}>Канал</h3>
          <h3>Новости</h3>
        </div>
      </div>
      
      <div className="login-body">
        {error && <p className="error-message" style={{color: '#ff4d4d', marginBottom: '15px'}}>{error}</p>}
        
        {isLogin ? (
          <>
            <h2 className="login-title">Вход</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Введите email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" required />
              </div>
              <button type="submit" className="login-button">Войти</button>
            </form>
            <p className="login-link">Нет аккаунта? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Зарегистрироваться</a></p>
          </>
        ) : (
          <>
            <h2 className="login-title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="telegram_id">TelegramID:</label>
                <input type="text" id="telegram_id" name="telegram_id" value={formData.telegram_id} onChange={handleChange} placeholder="Введите ваш ID" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Введите email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Введите пароль" required />
              </div>
              <button type="submit" className="login-button">Зарегистрироваться</button>
            </form>
            <p className="login-link">Уже есть аккаунт? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Войти</a></p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;