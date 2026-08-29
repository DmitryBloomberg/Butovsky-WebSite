import React, { useState } from 'react';
import './styles/login/login.css';
import './styles/login/login-body.css';

function Login() {
  const [isLogin, setIsLogin] = useState(false); // true - форма входа, false - форма регистрации
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Очищаем форму при переключении
    setFormData({
      email: '',
      password: '',
      name: ''
    });
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
        {isLogin ? (
          <>
            <h2 className="login-title">Вход</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Войти
              </button>
            </form>
            
            <p className="login-link">
              Нет аккаунта? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Зарегистрироваться</a>
            </p>
          </>
        ) : (
          <>
            <h2 className="login-title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name">TelegramID:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваш ID"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Зарегистрироваться
              </button>
            </form>
            
            <p className="login-link">
              Уже есть аккаунт? <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Войти</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;