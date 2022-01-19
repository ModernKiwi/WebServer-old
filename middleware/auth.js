import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';

dotenv.config('../.env');

// DotEnv Variables
const jwtSecret = process.env.JWT_SECRET;

export default function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorization Denied' });
  }

  //Verify token
  try {
    const decoded = verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
