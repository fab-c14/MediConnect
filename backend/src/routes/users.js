const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.route('/')
  .get(getUsers)
  .post(upload.single('avatar'), createUser);

router.route('/:id')
  .get(getUser)
  .put(upload.single('avatar'), updateUser)
  .delete(deleteUser);

module.exports = router;
