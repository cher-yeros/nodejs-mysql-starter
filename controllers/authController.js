const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const _ = require("lodash");

require("dotenv").config();
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { User, Role } = require("../models");
const sendToken = require("../utils/sendToken");

exports.loginUser = async (req, res, next) => {
  const { username, password, erp } = req.body;

  if (!username || !password || !erp) {
    return next(new ErrorHandler("Please enter valid credential", 400));
  }

  const user = await User.findOne({
    where: { erp, username },
    include: [Role],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Username or Password", 400));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Username or Password", 401));
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  sendToken(res, user, token);
};

exports.loginStep1 = async (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return next(new ErrorHandler("Please enter valid username", 400));
  }

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return next(new ErrorHandler("Couldn't find your account!", 400));
  }

  res.status(200).json({
    success: true,
    user: { username: user.username, id: user.id, firstTime: user.firstTime },
  });
};

exports.loginStep2 = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please enter valid credential", 400));
  }

  const user = await User.findOne({
    where: { username },
    include: [Role],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!user) {
    return next(new ErrorHandler("Credential not found!", 400));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  sendToken(res, user, token);
};

exports.createPassword = async (req, res, next) => {
  const { username, password } = req.body;
  const { userId } = req.params;

  if (!password) {
    return next(new ErrorHandler("Please enter password", 400));
  }

  const userFound = await User.findOne({
    where: { username },
  });

  if (!userFound) {
    return next(new ErrorHandler("user not found!", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const setPassword = await User.update(
    { password: hashed },
    {
      where: { username },
    }
  );

  if (!setPassword) {
    return next(new ErrorHandler("Password could not be updated!", 500));
  }

  const pwdUpdated = await User.update(
    { firstTime: false },
    {
      where: { username },
    }
  );

  if (!pwdUpdated) {
    return next(new ErrorHandler("Something went wrong!", 500));
  }

  const user = await User.findOne({
    where: { username },
    include: [Role],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!user) {
    return next(new ErrorHandler("Credential not found!", 400));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  sendToken(res, user, token);
};

exports.loggedUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    include: [Role],
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  res.status(200).json({
    success: true,
    user,
    // user: _.assign(_.omit(req.user.dataValues, ["password"])),
  });
});

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, email, role, phone, password } = req.body;

  const emailFound = await User.findOne({
    where: {
      email,
    },
  });

  const usernameFound = await User.findOne({
    where: {
      username,
    },
  });

  const phoneFound = await User.findOne({
    where: {
      phone,
    },
  });

  if (usernameFound)
    return next(new ErrorHandler("Username is already taken!", 400));
  if (emailFound) return next(new ErrorHandler("Email is already taken!", 400));
  if (phoneFound) return next(new ErrorHandler("Phone is already taken!", 400));

  if (!role) {
    return next(new ErrorHandler("You must select role"));
  }

  const userRole = await Role.findOne({ where: { key: role } });

  if (!userRole) {
    return next(new ErrorHandler("Invalid role"));
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash("12345678", salt);

  const cred = _.omit(req.body, ["confirmPassword", "role"]);
  try {
    const user = await User.create(
      _.omit(req.body, ["confirmPassword", "role"])
    );
    await user.addRole(userRole, { through: { selfGranted: false } });

    return res
      .status(200)
      .send({ success: true, user: _.omit(user.dataValues, ["password"]) });
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.checkUsername = catchAsyncError(async (req, res, next) => {
  const { username } = req.body;

  const uname = await User.findOne({ where: { username } });

  if (uname) {
    return next(new ErrorHandler("Please choose different username", 400));
  }

  res.status(200).json({
    success: true,
    username: username,
  });
});
