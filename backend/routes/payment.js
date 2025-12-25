const express = require('express');
const { sendPayment, getBalance, getProfile } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/send', auth, sendPayment);
router.get('/balance', auth, getBalance);
router.get('/profile', auth, getProfile);

module.exports = router;