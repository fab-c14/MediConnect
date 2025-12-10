const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide doctor name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  specialization: {
    type: String,
    required: [true, 'Please provide specialization']
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  avatar: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  availability: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  timings: {
    start: {
      type: String,
      default: '09:00'
    },
    end: {
      type: String,
      default: '17:00'
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
