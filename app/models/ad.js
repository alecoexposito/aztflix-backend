const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const AdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    path: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

AdSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Ad', AdSchema)
