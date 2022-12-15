const mongoose = require('mongoose')
const Device = mongoose.model('Device', {
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
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