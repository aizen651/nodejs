const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);

// ✅ Sync database
sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log('Database synced!'))
  .catch(err => console.error('DB Error:', err));

// ✅ Export for Vercel instead of app.listen
module.exports = app;