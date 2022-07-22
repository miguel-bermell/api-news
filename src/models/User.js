const { Schema, model } = require('mongoose');
const objectSanitized = require('../utils/modelsHelper');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    news: [{
      type: Schema.Types.ObjectId,
      ref: 'News',
    }],
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => objectSanitized(returnedObject),
});

const User = model('User', userSchema);

module.exports = User;
