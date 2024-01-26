const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  comment: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 100,
  },
  reservationDate: {
    type: String,
    required: true,
  },
  reservationTime: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'paypal', 'blik'],
    default: 'cash',
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  adInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
