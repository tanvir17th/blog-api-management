const User = require('./user.model');
const Blog = require('./blog.model');

User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = {
  User,
  Blog,
};