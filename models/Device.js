const mongoose = require('mongoose')
const Device = mongoose.model('Device', {
  name: {
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
  measurements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measurement',
    }
  ],
})


module.exports = Device