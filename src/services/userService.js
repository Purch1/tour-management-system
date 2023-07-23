const User = require("../models/userModel");

exports.updateUserService = async (id, userData) => {
  const updateUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
  });
  await updateUser.save();
  return updateUser;
};

exports.getAllUserService = async (page) => {
  const getAllUser = await User.find()
  return getAllUser;
};

exports.getUserService = async (id) => {
  const getUser = await User.findById(id);
  return getUser;
};

exports.searchUserService = async (city, distance, maxGroupSize) => {
  const searchUser = await User.find({
    city,
    distance: { $gte: distance },
    maxGroupSize: { $gte: maxGroupSize },
  });
  return searchUser;
};

exports.searchFeaturedUserService = async () => {
  const featuredUser = await User.find({ featured: true }).limit(4);
  return featuredUser;
};

exports.getUserCountService = async () => {
  const getUserCount = await User.estimatedDocumentCount().limit(4);
  return getUserCount;
};

exports.deleteUserService = async (id) => {
  const getUser = await User.findByIdAndDelete(id);
  return getUser;
};
