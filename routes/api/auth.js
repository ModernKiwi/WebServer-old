import dotenv from 'dotenv';
dotenv.config('../.env');

import express from 'express';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User.js';
import auth from '../../middleware/auth.js';

var router = express.Router();
var { check, validationResult } = expressValidator;

const jwtSecret = process.env.JWT_SECRET;

// @route   GET api/auth
// @desc    Test route, disable when not needed.
// @access  Private - (Auth Middleware)
router.get('/', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is requires').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentialss' }],
        });
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({
          errors: [{ msg: 'Invalid Credentialss' }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000, //3600 is an hour
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
