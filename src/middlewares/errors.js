const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // console.log(err);
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    // console.log("error", err);
    // console.log("req", req);
    // console.log("res", res);
    error.message = err.message;
    // console.log(
    //   "error",
    //   err,
    //   err?.message.substring(0, error?.message.indexOf(":"))
    // );
    if (
      error?.message.substring(0, error?.message.indexOf(":")) ===
      "SequelizeValidationError"
    ) {
      // console.log("Error code", err.code);
      // console.log("Error status code", err.statusCode);

      let errorString = error?.message.substring(
        error?.message.indexOf(":") + 2,
        error?.message.length
      );
      // let message;
      errorString = errorString.replaceAll("notNull Violation: ", "");

      errorString = errorString.replaceAll("Validation error: ", "");
      errorString = errorString.replaceAll("\n", "");
      const message = errorString.split(",");
      // console.log(message);

      error = new ErrorHandler(message, 404);
    }
    if (err.name === "CastError") {
      // Wrong Mongoose Object ID Error
      const message = `Resource not found. Invalid: ${err.path}`;

      // res.status(400).json({
      //   success: false,
      //   message,
      // });

      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      // res.status(400).json({
      //   success: false,
      //   message,
      // });
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      res.status(400).json({
        success: false,
        message,
      });
      //  error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again!!!";
      // res.status(400).json({
      //   success: false,
      //   message,
      // });
      error = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired. Try Again!!!";
      // res.status(400).json({
      //   success: false,
      //   message,
      // });
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
