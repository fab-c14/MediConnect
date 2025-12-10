const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Please provide patient name'],
    trim: true
  },
  patientEmail: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    trim: true
  },
  patientPhone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Please select a doctor']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please provide appointment date']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Please provide appointment time']
  },
  reason: {
    type: String,
    required: [true, 'Please provide reason for appointment'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
