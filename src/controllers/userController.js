const UserService = require("../services/userService");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");



exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserService.updateUserService(id, req.body);
    return res
      .status(STATUS_CODE.Ok)
      .json({ message: "Successful", data: updatedUser });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const getAllUser = await UserService.getAllUserService(page);
    return res.status(STATUS_CODE.OK).json({
      message: "Successful",
      count: getAllUser.length,
      data: getAllUser,
    });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserService.getUserService(id);
    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "User not found" });
    }
    return res.status(STATUS_CODE.Ok).json({ message: "Successful", data: user });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.searchUser = async (req, res) => {
  try {
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    const User = await UserService.searchUserService(
      city,
      distance,
      maxGroupSize
    );
    return res.status(STATUS_CODE.OK).json({ message: "Successful", User });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.featuredUser = async (req, res) => {
  try {
    const User = await UserService.searchFeaturedUserService();
    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Successful", count: User.length, data: User });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const getUserCount = await UserService.getUserCountService();
    return res
      .status(STATUS_CODE.OK)
      .json({ message: "Successful", data: getUserCount });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const User = await UserService.deleteUserService(id);
    if (!User) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "User not found" });
    }
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "User deleted", User });
  } catch (error) {
    return handleError(error, res);
  }
};
