const bcrypt = require('bcryptjs');
const express = require('express');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const log = require('../../utils/logger');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// @route  GET api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'You must include a valid email').isEmail(),
    check('password', 'You must include a password of min 6 chars').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already registered' }] });
      }

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      log.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
