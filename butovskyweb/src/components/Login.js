import React, { useState } from 'react';
import './styles/login/login.css';
import './styles/login/login-body.css';

function Login() {
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

  return (
    <div className="login-container">
      <div className='login-Head'>
        <h1>Butovsky</h1>
        <div className='login-Head-mini'>
          <h3>Поддержка</h3>
          <h3>Канал</h3>
          <h3>Новости</h3>
        </div>
      </div>
      <div className="login-body">
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
              placeholder="Введите ваше имя"
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
          Уже есть аккаунт? <a href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
}

export default Login;