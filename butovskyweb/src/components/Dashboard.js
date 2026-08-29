import React, { useState } from 'react';
import './styles/dashboard/dashboard.css';

// Иконки
const Icons = {
  Home: () => <i className='bx bxs-home'></i>,
  Wallet: () => <i className='bx bxs-wallet'></i>,
  Ruble: () => <i className='bx bx-ruble'></i>,
  Plus: () => <i className='bx bx-plus-circle'></i>,
  History: () => <i className='bx bx-time-five'></i>
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

  // Оставляем только Главную и PAY
  const menuItems = [
    { id: 'home', label: 'Главная', icon: <Icons.Home /> },
    { id: 'wallet', label: 'PAY', icon: <Icons.Wallet /> },
  ];

  // Логика изменения контента шапки
  const getHeaderTitle = () => {
    return activeTab === 'wallet' ? 'Оплата' : 'Butovsky';
  };

  // Рендеринг основного контента
  const renderContent = () => {
    if (activeTab === 'wallet') {
      return (
        <div className="wallet-container">
          <div className="welcome-card wallet-balance-card">
            <h2>Текущий баланс</h2>
            <div className="big-balance">
              <span>500</span> <Icons.Ruble />
            </div>
          </div>

          <h3 className="section-title">Пополнить баланс</h3>
          <div className="container-card">
            <div className='card payment-card'>
              <div className='card-head'>
                <h1><Icons.Plus /> Реквезиты</h1>
                <p>Моментальное зачисление без комиссии</p>
              </div>
              <div className='card-buy'>
                <button>Пополнить</button>
              </div>
            </div>

          </div>

          <h3 className="section-title">История операций</h3>
          <div className="history-list">
            <div className="history-item">
              <div className="h-info">
                <span className="h-title">Пополнение</span>
                <span className="h-date">Сегодня, 14:30</span>
              </div>
              <span className="h-amount plus">+1000 ₽</span>
            </div>
            <div className="history-item">
              <div className="h-info">
                <span className="h-title">Оплата VPN</span>
                <span className="h-date">Вчера, 10:15</span>
              </div>
              <span className="h-amount minus">-299 ₽</span>
            </div>
          </div>
        </div>
      );
    }

    // Контент для главной (Home)
    return (
      <>
        <div className="welcome-card">
          <h2>Добро пожаловать!</h2>
          <p>Будьте в сети, Путешествуйте, Контролируйте</p>
        </div>
        <div className='container-card'>
          <div className='card'>
            <div className='card-head'>
              <h1><i className='bx bx-planet'></i> ButovskyVPN</h1>
              <p><i className='bx bx-info-square'></i> Доступ к заблокированным сервисам</p>
            </div>
            <div className='card-buy'>
              <button>Выбрать тариф</button>
            </div>
          </div>
          <div className='card'>
            <div className='card-head'>
              <h1><i className='bx bx-memory-card'></i> Butovsky | E-SIM</h1>
              <p><i className='bx bx-info-square'></i> Будьте в сети в любой стране</p>
            </div>
            <div className='card-buy'>
              <button>Выбрать тариф</button>
            </div>
          </div>
          <div className='card'>
            <div className='card-head'>
              <h1><i className='bx bx-server'></i> Butovsky | VPN-HOST</h1>
              <p><i className='bx bx-info-square'></i> Сервер под VPN в любой локации</p>
            </div>
            <div className='card-buy'>
              <button>Заказать</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Шапка */}
      <div className='dashboard-header'>
        <div className='header-brand'>
          <h1>{getHeaderTitle()}</h1>
        </div>
        <div className='header-balance'>
          <Icons.Wallet />
          <span>500</span>
          <Icons.Ruble />
        </div>
      </div>

      {/* Основной контент */}
      <div className='dashboard-content'>
        {renderContent()}
      </div>

      {/* Нижнее меню навигации (только Главная и PAY) */}
      <nav className='bottom-nav'>
        {menuItems.map((item) => (
          <button 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Dashboard;