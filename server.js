import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './database/mongodb.js';
import authRoutes from './routes/api/auth.js';
import userRoutes from './routes/api/users.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
