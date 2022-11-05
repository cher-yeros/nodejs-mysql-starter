const jwt = require("jsonwebtoken");
const { User } = require("../models");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this recouse 9!", 401));
  }

  const { user } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findOne({ where: { id: user.id } });

  next();
};

exports.onlyAdmin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this recouse!", 401));
  }

  const { user } = jwt.verify(token, process.env.JWT_SECRET);

  const result = user.Roles.find((role) => role.key === "admin");
  const result1 = user.Roles.find((role) => role.key === "system-admin");

  if (!result && !result1) {
    return next(
      new ErrorHandler("You are not autherized to access this area!", 401)
    );
  }

  next();
};

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     console.log(req.user);

//     if (!roles.includes(req.user?.role)) {
//       res.status(403).json({
//         success: false,
//         message: `Role (${req.user?.role}) is not allowed to acccess this resource`,
//       });
//     }
//     next();
//   };
// };
