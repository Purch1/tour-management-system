const bcrypt = require("bcrypt");
const AuthService = require("../services/authService");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await AuthService.createUserService({
      username: username,
      email: email,
      password: hashPassword,
    });
    return res
      .status(STATUS_CODE.CREATED)
      .json({ message: "Created succesfully", data: user });
  } catch (error) {
    return handleError(error, res);
  }
};

exports.loginUser = async (req, res) => {
  const { email} = req.body;
  try {
    const user = await AuthService.loginUserService({ email });

    //If user doesn't exist
    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "User not found" });
    }

    const comparePssword = await bcrypt.compare(req.body.password, user.password);

    if (!comparePssword) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "Incorrect email or password" });
    }

    const token = user.generateAuthToken()

    return res
      .status(STATUS_CODE.CREATED)
      .json({ token, message: "Login succesfully", data: user });
  } catch (error) {
    return handleError(error, res);
  }
};
