const User = require("../models/userModel");

exports.createUserService = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.loginUserService = async (userData) => {
  const user = await User.findOne(userData);
  return user;
};
