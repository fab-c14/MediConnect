const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.route('/')
  .get(getDoctors)
  .post(upload.single('avatar'), createDoctor);

router.route('/:id')
  .get(getDoctor)
  .put(upload.single('avatar'), updateDoctor)
  .delete(deleteDoctor);

module.exports = router;
