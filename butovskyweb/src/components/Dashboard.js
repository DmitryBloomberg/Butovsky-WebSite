import React, { useState, useEffect } from 'react';
import './styles/dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom';

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
    
    // 🆕 Стейт для хранения реального баланса из БД
    const [balance, setBalance] = useState(0); 
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);

    const menuItems = [
        { id: 'home', label: 'Главная', icon: <Icons.Home /> },
        { id: 'wallet', label: 'PAY', icon: <Icons.Wallet /> },
    ];

    // 🆕 Запрашиваем актуальный баланс с нового сервера при загрузке компонента
    useEffect(() => {
        const fetchRealBalance = async () => {
            try {
                // credentials: 'include' отправляет cookie сессии на сервер
                const response = await fetch('http://localhost:5000/api/balance', {
                    method: 'GET',
                    credentials: 'include', 
                });

                if (response.ok) {
                    const data = await response.json();
                    setBalance(data.balance); // Сохраняем реальный баланс из БД
                } else {
                    console.warn('Не удалось загрузить баланс, возможно, пользователь не авторизован');
                }
            } catch (error) {
                console.error('Ошибка сети при запросе баланса:', error);
            } finally {
                setIsLoadingBalance(false);
            }
        };

        fetchRealBalance();
    }, []); // Пустой массив означает, что запрос выполнится только при монтировании компонента

    const getHeaderTitle = () => {
        return activeTab === 'wallet' ? 'Butovsky PAY' : 'Butovsky';
    };

    // Функция для красивого отображения баланса (пока грузится или если 0)
    const displayBalance = isLoadingBalance ? '...' : balance;
    const navigate = useNavigate();

    const renderContent = () => {
        if (activeTab === 'wallet') {
            return (
                <div className="wallet-container">
                    <div className="welcome-card wallet-balance-card">
                        <h2>Текущий баланс</h2>
                        <div className="big-balance">
                            {/* 🔄 Подставляем реальный баланс */}
                            <span>{displayBalance}</span> <Icons.Ruble />
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
                                <button onClick={() => navigate('/dashboard/bpay')}>Пополнить</button>
                            </div>
                        </div>

                        <div className='card payment-card'>
                            <div className='card-head'>
                                <h1><i class='bx bx-ruble'></i> Platega</h1>
                                <p>Оплата по СБП 7%</p>
                            </div>
                            <div className='card-buy'>
                                <button onClick={() => navigate('/dashboard/error')}>Пополнить</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

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
                            <button onClick={() => navigate('/dashboard/butovskyvpn')}>Подключить</button>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-head'>
                            <h1><i className='bx bx-memory-card'></i> Butovsky | E-SIM</h1>
                            <p><i className='bx bx-info-square'></i> Будьте в сети в любой стране</p>
                        </div>
                        <div className='card-buy'>
                            <button onClick={() => navigate('/dashboard/error')} >Выбрать тариф</button>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-head'>
                            <h1><i className='bx bx-server'></i> Butovsky | VPN-HOST</h1>
                            <p><i className='bx bx-info-square'></i> Сервер под VPN в любой локации</p>
                        </div>
                        <div className='card-buy'>
                            <button onClick={() => navigate('/dashboard/error')}>Заказать</button>
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
                    {/* 🔄 Подставляем реальный баланс в шапку */}
                    <span>{displayBalance}</span>
                    <Icons.Ruble />
                </div>
            </div>

            {/* Основной контент */}
            <div className='dashboard-content'>
                {renderContent()}
            </div>

            {/* Нижнее меню навигации */}
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