// Auch_Server.js
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка подключения к PostgreSQL
// Используем host.docker.internal для доступа к БД на хост-машине из контейнера
const pool = new Pool({
  host: process.env.DB_HOST || 'host.docker.internal', 
  port: parseInt(process.env.DB_PORT) || 6432,
  database: process.env.DB_NAME || 'Butovsky',
  user: process.env.DB_USER || 'postgres',      // Твой пользователь
  password: process.env.DB_PASSWORD || 'Dima0807' // Твой пароль
});

// Middleware
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Проверка подключения при старте
pool.connect((err, client, release) => {
  if (err) return console.error('❌ Ошибка подключения к БД:', err.message);
  console.log('✅ Подключено к базе данных Butovsky');
  release();
});

// --- API ROUTES ---

// Регистрация
app.post('/api/register', async (req, res) => {
  const { telegram_id, email, password } = req.body;

  if (!telegram_id || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  try {
    // Проверка на существующего пользователя
    const existing = await pool.query(
      'SELECT * FROM users WHERE telegram_id = $1 OR email = $2',
      [telegram_id, email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Telegram ID или Email уже заняты' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя с балансом 0
    const newUser = await pool.query(
      'INSERT INTO users (telegram_id, email, password, balance) VALUES ($1, $2, $3, $4) RETURNING telegram_id, email, balance',
      [telegram_id, email, hashedPassword, 0]
    );

    const user = newUser.rows[0];

    // Установка Cookie сессии
    const sessionData = { userId: user.telegram_id, email: user.email };
    res.cookie('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      sameSite: 'lax',
    });

    res.status(201).json({ message: 'Успешная регистрация', user });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

// Вход
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Установка Cookie
    const sessionData = { userId: user.telegram_id, email: user.email };
    res.cookie('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.json({ message: 'Вход выполнен', user: { telegram_id: user.telegram_id, email: user.email, balance: user.balance } });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
});

// Проверка авторизации
app.get('/api/auth-check', (req, res) => {
  const sessionCookie = req.cookies.session;
  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie);
      res.json({ isAuthenticated: true, user: sessionData });
    } catch (e) {
      res.clearCookie('session');
      res.json({ isAuthenticated: false });
    }
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Выход
app.post('/api/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ message: 'Выход выполнен' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});