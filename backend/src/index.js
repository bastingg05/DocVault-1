const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();

const { connectToDatabase } = require('./mongodb');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');

const app = express();
app.use(helmet());
// CORS configuration for production and development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://192.168.20.100:5173',
      'https://doc-vault-1.vercel.app'
    ];
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow localhost with any port for development
    if (origin.match(/^https?:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Handle preflight requests for CORS support
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  
  // Check if origin is allowed (same logic as CORS config)
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://192.168.20.100:5173',
    'https://doc-vault-1.vercel.app'
  ];
  
  let isAllowed = false;
  
  if (!origin) {
    isAllowed = true; // Allow requests with no origin
  } else if (allowedOrigins.includes(origin)) {
    isAllowed = true;
  } else if (origin.match(/^https?:\/\/localhost:\d+$/)) {
    isAllowed = true;
  }
  
  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
    res.sendStatus(200);
  } else {
    res.status(403).json({ error: 'CORS policy violation' });
  }
});

// Health check endpoint for Railway
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'DocVault API Server is running',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Additional health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5051;
const HOST = process.env.HOST || '0.0.0.0';

// Log environment variables for debugging
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('PORT:', PORT);
console.log('HOST:', HOST);

connectToDatabase().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
    console.log(`Health check available at http://${HOST}:${PORT}/`);
  });
}).catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});
