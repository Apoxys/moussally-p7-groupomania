const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');
const passwordValidator = require('../middleware/passwordValidator');

router.post('/signup', passwordValidator, usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;