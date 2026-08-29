import React, { useState } from 'react';
import './styles/bpay/bpay-body.css';

const PaymentWizard = () => {
  // Состояние текущего шага (0 - ввод суммы, 1 - перевод, 2 - чек, 3 - подтверждение, 4 - успех)
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);

  // Обработчик перехода к следующему шагу
  const handleNext = () => {
    if (step === 0 && !amount) return; // Проверка на пустую сумму
    if (step === 2 && !file) return;   // Проверка на отсутствие файла
    setStep(step + 1);
  };

  // Обработчик загрузки файла
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Рендеринг контента в зависимости от шага
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="wizard-step">
            <h2>Введите сумму</h2>
            <p>Укажите сумму для пополнения баланса</p>
            <input 
              type="number" 
              placeholder="0 ₽" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
            />
          </div>
        );
      case 1:
        return (
          <div className="wizard-step">
            <h2>Совершите перевод</h2>
            <p>Переведите <b>{amount} ₽</b> на номер:</p>
            <div className="phone-card">
              <i className='bx bxs-phone'></i>
              <span>+7 991 989-76-78</span>
              <small>Сбербанк</small>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="wizard-step">
            <h2>Прикрепите чек</h2>
            <p>Загрузите скриншот или фото чека об оплате</p>
            <label className="file-upload">
              <i className='bx bx-cloud-upload'></i>
              {file ? file.name : 'Выберите файл'}
              <input type="file" onChange={handleFileChange} hidden />
            </label>
          </div>
        );
      case 3:
        return (
          <div className="wizard-step">
            <h2>Подтверждение</h2>
            <p>Проверьте данные перед отправкой:</p>
            <ul className="summary-list">
              <li>Сумма: <b>{amount} ₽</b></li>
              <li>Получатель: <b>+7 991 989-76-78</b></li>
              <li>Чек: <b>{file?.name}</b></li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div className="wizard-step success-step">
            <i className='bx bx-check-shield bx-tada'></i>
            <h2>Успешно!</h2>
            <p>Ваше пополнение принято.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Если шаг успешен (4), кнопку "Далее" не показываем
  if (step === 4) {
    return (
      <div className="payment-wizard-container">
        {renderStepContent()}
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
          <div className="payment-wizard-container">
      {/* Индикатор прогресса */}
      <div className="progress-bar">
        {[0, 1, 2, 3].map((s) => (
          <div key={s} className={`progress-dot ${step >= s ? 'active' : ''}`}></div>
        ))}
      </div>

      {renderStepContent()}

      <button className="next-btn" onClick={handleNext}>
        Далее <i className='bx bx-right-arrow-alt'></i>
      </button>
    </div>
        </div>
      </>
  );
};

export default PaymentWizard;