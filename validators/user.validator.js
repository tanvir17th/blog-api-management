const { body, param } = require('express-validator');

const updateProfileValidation = [
  body('firstname').optional().notEmpty().withMessage('First name cannot be empty').trim(),
  body('lastname').optional().notEmpty().withMessage('Last name cannot be empty').trim(),
];

const updatePasswordValidation = [
  body('password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

const statusValidation = [
  param('id').isInt().withMessage('Invalid User ID'),
  body('isActive').isBoolean().withMessage('isActive must be a boolean value'),
];

module.exports = { updateProfileValidation, updatePasswordValidation, statusValidation };