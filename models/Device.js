const mongoose = require('mongoose')
const Device = mongoose.model('Device', {
  name: String,
  coordinate: String,
})

module.exports = Device