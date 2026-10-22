const { Op } = require('sequelize');
const { Blog, User } = require('../models');

const createBlog = async (req, res, next) => {
  try {
    const { blogTitle, blog, category } = req.body;

    const newBlog = await Blog.create({
      userId: req.user.id,
      blogTitle,
      blog,
      category,
    });

    return res.status(201).json({
      message: 'Blog created successfully.',
      blog: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const { title, category } = req.query;
    const whereClause = {};

    if (title) {
      // Use Op.like for MySQL (MySQL LIKE is case-insensitive by default)
      whereClause.blogTitle = { [Op.like]: `%${title}%` };
    }

    if (category) {
      whereClause.category = category;
    }

    const blogs = await Blog.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstname', 'lastname'],
        },
      ],
      order: [['createAt', 'DESC']],
    });

    return res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstname', 'lastname'],
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { blogTitle, blog, category } = req.body;

    const existingBlog = await Blog.findByPk(id);

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    if (req.user.role !== 'admin' && existingBlog.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this blog.' });
    }

    if (blogTitle) existingBlog.blogTitle = blogTitle;
    if (blog) existingBlog.blog = blog;
    if (category) existingBlog.category = category;

    await existingBlog.save();

    return res.status(200).json({
      message: 'Blog updated successfully.',
      blog: existingBlog,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBlog = await Blog.findByPk(id);

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    if (req.user.role !== 'admin' && existingBlog.userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this blog.' });
    }

    await existingBlog.destroy();

    return res.status(200).json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};