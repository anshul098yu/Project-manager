// server.js
require('dotenv').config(); // Load .env variables at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Initialize Express app
const app = express();

// Configure CORS - Allow all origins for now (you can restrict later)
const corsOptions = {
  origin: true, // Reflect the origin dynamically
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' })); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // To parse URL-encoded bodies

// Import routes
const projectRoutes = require('./backend/routes/projects');
const taskRoutes = require('./backend/routes/tasks');
const aiRoutes = require('./backend/routes/ai');

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    message: '✅ Project Management System Backend is running successfully!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: '✅ Project Management System API is running successfully!',
    endpoints: {
      projects: '/api/projects',
      tasks: '/api/tasks',
      ai: '/api/ai',
    },
  });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projectmanagement';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit if DB connection fails
  });

module.exports = app;