const express = require('express');
const log = require('../../utils/logger');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    log.info(JSON.stringify(req.body));
    res.send('Added User');
  }
);

module.exports = router;
