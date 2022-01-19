import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config('../.env');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const cluster = process.env.DB_Cluster;
const databases = {
  Live: 'Production',
  Dev: 'Development',
  Test: 'Test',
};

const uri = `mongodb+srv://${user}:${pass}@${cluster}.sfyit.mongodb.net/${databases.Live}`;
const options = {
  dbName: databases.Test,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  retryWrites: true,
  w: 'majority',
};

const connectDB = async () => {
  try {
    console.log(uri);
    mongoose.connect(uri, options);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
