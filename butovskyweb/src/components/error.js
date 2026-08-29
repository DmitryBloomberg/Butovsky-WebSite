import React, { useState } from 'react';
import './styles/news/news.css';
import './styles/news/news-body.css';

function Error() {

  return (
    <div className="news-container">
      <div className='news-Head'>
        <h1>Butovsky</h1>
        <div className='news-Head-mini'>
          <h3 onClick={() => window.location.href = 'https://t.me/DmitryBloomberg'}>Поддержка</h3>
          <h3 onClick={() => window.location.href = 'https://t.me/ButovskyVPNChannel'}>Канал</h3>
          <h3>Новости</h3>
        </div>
      </div>
      <div className='Back_news'>
        <i class='bx bx-arrow-back'></i>
      </div>
      <div className='news-container'>
        <i class='bx bxs-error'></i>
        <h1>Данная система в разработке!</h1>
        <h3>Следите за обновлениями в нашем Telegram канале</h3>
        <button onClick={() => window.location.href = 'https://t.me/ButovskyVPNChannel'}>Перейти</button>
      </div>      
    </div>
  );
}

export default Error;