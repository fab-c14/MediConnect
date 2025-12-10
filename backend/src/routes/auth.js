const express = require('express');
const router = express.Router();
const { login, getMe, setupAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/setup', setupAdmin);
router.get('/me', protect, getMe);

module.exports = router;
