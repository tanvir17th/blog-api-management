const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database Connection and Server Sync
sequelize.sync().then(() => {
  console.log('Database connected and synced successfully.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});