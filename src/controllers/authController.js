const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AuthService = require("../services/authService");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");


exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        //Hashing the password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

      const user = await AuthService.createUserService({
        username: username,
        email: email,
        password: hashPassword
      });
      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: "Created succesfully", data: user });
    } catch (error) {
      return handleError(error, res);
    }
  };

exports.loginUser = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await AuthService.loginUserService({email});

      //If user doesn't exist
      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ error: "User not found"});
      }
      return res
        .status(STATUS_CODE.CREATED)
        .json({ message: "Login succesfully"});
    } catch (error) {
      return handleError(error, res);
    }
  };