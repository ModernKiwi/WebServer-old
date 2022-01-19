// Module imports
import dotenv from 'dotenv';
import express from 'express';

// Set Variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Internal imports
import connectDB from './database/mongodb.js';

// Setup Variables
const app = express();

// Test connection to database.
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

// Define Routes
// TODO: Setup routing for ./routes/api/auth.js
// TODO: Setup routing for ./routes/api/users.js

app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
