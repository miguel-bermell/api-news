const { Schema, model } = require('mongoose')

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true
    },
    archiveDate: {
      type: Date,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: { createdAt: 'date', updatedAt: 'updatedAt' } }
)

newsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const News = model('News', newsSchema)

module.exports = News
