const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { blogValidation, idParamValidation } = require('../validators/blog.validator');
const handleValidationErrors = require('../middleware/validation.middleware');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', idParamValidation, handleValidationErrors, blogController.getBlogById);

// Protected routes (User & Admin)
router.post('/create', authenticate, blogValidation, handleValidationErrors, blogController.createBlog);
router.put('/update/:id', authenticate, idParamValidation, blogValidation, handleValidationErrors, blogController.updateBlog);

// Exact endpoint matching specification table for deletion
router.delete('/delete/:id', authenticate, idParamValidation, handleValidationErrors, blogController.deleteBlog);
// Optional alias for DELETE /api/blogs/:id
router.delete('/:id', authenticate, idParamValidation, handleValidationErrors, blogController.deleteBlog);

module.exports = router;