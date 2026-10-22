const bcrypt = require('bcryptjs');
const { User } = require('../models');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.isActive = isActive;
    await user.save();

    return res.status(200).json({
      message: `User status successfully updated to ${isActive ? 'active' : 'inactive'}.`,
    });
  } catch (error) {
    next(error);
  }
};

const getOwnProfile = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    delete user.password;
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateOwnProfile = async (req, res, next) => {
  try {
    const { firstname, lastname } = req.body;
    const user = req.user;

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    await user.save();

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

const updateOwnPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.user;

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  getOwnProfile,
  updateOwnProfile,
  updateOwnPassword,
};