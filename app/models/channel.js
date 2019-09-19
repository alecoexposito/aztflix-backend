const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const ChapterSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    path: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ShowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    chapters: [ChapterSchema]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ChannelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    shows: [ShowSchema]
  },
  {
    versionKey: false,
    timestamps: true
  }
)
ChannelSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Channel', ChannelSchema)
