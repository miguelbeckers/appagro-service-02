const mongoose = require('mongoose')
const Measurement = mongoose.model('Measurement', {
  value: Number,
  date: String,
})

module.exports = Measurement