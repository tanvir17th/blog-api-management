const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  blogTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createAt',
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updateAt',
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
}, {
  tableName: 'blogs',
  timestamps: true,
  createdAt: 'createAt',
  updatedAt: 'updateAt',
});

module.exports = Blog;