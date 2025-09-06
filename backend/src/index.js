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
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174','http://192.168.20.100:5173', 'https://doc-vault-1.vercel.app', 'https://24f968c5d330.ngrok-free.app'], credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => res.json({ message: 'DocVault API Server is running' }));
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5051;
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
}).catch((err) => {
  console.error('Startup failed:', err);
  process.exit(1);
});
