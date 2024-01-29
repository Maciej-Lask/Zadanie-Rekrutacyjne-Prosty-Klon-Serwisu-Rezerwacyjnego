const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  content: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  datePublished: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
    required: false,
  },
  sellerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Ad', adSchema);
