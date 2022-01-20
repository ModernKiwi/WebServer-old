import dotenv from 'dotenv';
dotenv.config('../.env');

import express from 'express';
import expressValidator from 'express-validator';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User.js';

var router = express.Router();
var { check, validationResult } = expressValidator;

const jwtSecret = process.env.JWT_SECRET;

// @route   GET api/users
// @desc    Test route, Disable when not required.
// @access  Public
router.get('/', (req, res) => res.send('User Route'));

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a valid Password with 8 or more characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await UserModel.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }

      user = new UserModel({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(15);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get(jwtSecret),
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
