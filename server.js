import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './database/mongodb.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

// Define Routes
// TODO: Setup routing for ./routes/api/auth.js
// TODO: Setup routing for ./routes/api/users.js

app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
