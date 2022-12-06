const mongoose = require('mongoose')
const Measurement = mongoose.model('Measurement', {
  value: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = Measurement