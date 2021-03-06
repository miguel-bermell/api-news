const { Schema, model } = require('mongoose');
const objectSanitized = require('../utils/modelsHelper');

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    archiveDate: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'date', updatedAt: 'updatedAt' } },
);

newsSchema.set('toJSON', {
  transform: (document, returnedObject) => objectSanitized(returnedObject),
});

const News = model('News', newsSchema);

module.exports = News;
