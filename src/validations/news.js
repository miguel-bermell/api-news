const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().allow(''),
  userId: Joi.string().required(),
});
