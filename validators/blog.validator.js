const { body, param } = require('express-validator');

const blogValidation = [
  body('blogTitle').notEmpty().withMessage('Blog title is required').trim(),
  body('blog').notEmpty().withMessage('Blog content is required'),
  body('category').notEmpty().withMessage('Category is required').trim(),
];

const idParamValidation = [
  param('id').isInt().withMessage('Invalid Blog ID'),
];

module.exports = { blogValidation, idParamValidation };