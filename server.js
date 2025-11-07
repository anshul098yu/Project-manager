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

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://your-frontend-vercel-url.vercel.app',
      // Add your Vercel frontend URL here once you have it
    ];
    
    // Check if the origin is in our allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' })); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // To parse URL-encoded bodies

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
}

// Import routes
const projectRoutes = require('./backend/routes/projects');
const taskRoutes = require('./backend/routes/tasks');
const aiRoutes = require('./backend/routes/ai');

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/', (req, res) => {
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
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });
}

// Catch-all for undefined routes (optional)
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API Route not found',
    path: req.originalUrl,
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