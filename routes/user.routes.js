const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { updateProfileValidation, updatePasswordValidation, statusValidation } = require('../validators/user.validator');
const handleValidationErrors = require('../middleware/validation.middleware');

// Profile routes (User & Admin)
router.get('/profile', authenticate, userController.getOwnProfile);
router.put('/profile/update', authenticate, updateProfileValidation, handleValidationErrors, userController.updateOwnProfile);
router.patch('/password', authenticate, updatePasswordValidation, handleValidationErrors, userController.updateOwnPassword);

// Admin-only user management routes
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/:id', authenticate, authorize('admin'), userController.getUserById);
router.patch('/:id/status', authenticate, authorize('admin'), statusValidation, handleValidationErrors, userController.updateUserStatus);

module.exports = router;