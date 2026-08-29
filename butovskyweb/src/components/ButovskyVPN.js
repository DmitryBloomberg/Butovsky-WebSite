import React, { useState } from 'react';
import './styles/butovsky_vpn/butovsky_vpn_body.css';
import './styles/butovsky_vpn/butovsky_vpn.css';

function ButovskyVPN() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  // Имитация баланса пользователя (в реальном проекте придет с бэкенда/API)
  const [userBalance, setUserBalance] = useState(500); 

  const plans = [
    {
      id: 1,
      name: 'START',
      duration: '1 месяц',
      price: 100, // Числовое значение для расчетов
      priceDisplay: '100₽',
      features: ['30 устройств', 'Все локации', 'Безлимитный трафик', 'Приоритетная поддержка'],
      popular: true
    },
    {
      id: 2,
      name: 'COMFORT',
      duration: '3 месяца',
      price: 300,
      priceDisplay: '300₽',
      features: ['30 устройств', 'Все локации', 'Безлимитный трафик', 'Приоритетная поддержка'],
    },
    {
      id: 3,
      name: 'VERIFIED',
      duration: '12 месяцев',
      price: 1200,
      priceDisplay: '1200₽',
      features: ['30 устройств', 'Все локации', 'Безлимитный трафик', 'Приоритетная поддержка']
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
    setShowCheckout(false); // Сбрасываем чек при смене тарифа
  };

  const handleProceedToCheckout = () => {
    if (selectedPlan) setShowCheckout(true);
  };

  const handlePay = () => {
    if (!currentPlan) return;
    
    if (userBalance >= currentPlan.price) {
      setUserBalance(prev => prev - currentPlan.price);
      alert(`Оплата успешна! Тариф "${currentPlan.name}" активирован.`);
      setShowCheckout(false);
      setSelectedPlan(null);
    } else {
      alert('Недостаточно средств на балансе. Пожалуйста, пополните счет.');
    }
  };

  return (
    <div className='ButovskyVPN-body'>
      {/* Шапка с балансом */}
      <div className='ButovskyVP-Head'>
        <div className='ButovskyVP-Head-Logo'>
            <i className='bx bx-planet'></i>
            <h2>ButovskyVPN</h2>
        </div>
        
        {/* Блок баланса */}
        <div className='balance-display'>
          <span className='balance-label'>Баланс:</span>
          <span className='balance-value'>{userBalance}₽</span>
        </div>

        <div className='ButovskyVP-Head-mini'>
            <i className='bx bx-support'></i>
        </div>
      </div>

      <div className='plans-container'>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            {plan.popular && <div className='popular-badge'>Рекомендуем</div>}
            <div className='plan-header'>
              <h2>{plan.name}</h2>
              <span className='duration'>{plan.duration}</span>
            </div>
            <div className='plan-price'>
              <span className='price'>{plan.priceDisplay}</span>
            </div>
            <ul className='plan-features'>
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <button className='buy-button'>
              {selectedPlan === plan.id ? 'Выбрано' : 'Выбрать тариф'}
            </button>
          </div>
        ))}
      </div>

      {/* Мини-чек и кнопка оплаты */}
      {showCheckout && currentPlan && (
        <div className='mini-check-overlay'>
          <div className='mini-check'>
            <div className='check-header'>
              <h3>Подтверждение заказа</h3>
              <button className='close-check' onClick={() => setShowCheckout(false)}>✕</button>
            </div>
            
            <div className='check-details'>
              <div className='check-row'>
                <span>Тариф:</span>
                <strong>{currentPlan.name}</strong>
              </div>
              <div className='check-row'>
                <span>Период:</span>
                <strong>{currentPlan.duration}</strong>
              </div>
              <div className='check-divider'></div>
              <div className='check-row total'>
                <span>К оплате:</span>
                <strong>{currentPlan.priceDisplay}</strong>
              </div>
              <div className='check-row balance-info'>
                <span>Ваш баланс:</span>
                <span className={userBalance >= currentPlan.price ? 'sufficient' : 'insufficient'}>
                  {userBalance}₽
                </span>
              </div>
            </div>

            <button 
              className='pay-button' 
              onClick={handlePay}
              disabled={userBalance < currentPlan.price}
            >
              {userBalance >= currentPlan.price ? 'Оплатить подписку' : 'Недостаточно средств'}
            </button>
          </div>
        </div>
      )}

      {/* Кнопка перехода к чеку (если выбран тариф, но чек еще не открыт) */}
      {selectedPlan && !showCheckout && (
        <div className='checkout-section'>
          <button className='checkout-button' onClick={handleProceedToCheckout}>
            Перейти к оформлению
          </button>
        </div>
      )}
    </div>
  );
}

export default ButovskyVPN;