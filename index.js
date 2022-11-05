// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// const app = express();
// require("dotenv").config();

// const errorMiddleware = require("./middlewares/errors");
// const ErrorHandler = require("./utils/errorHandler");

// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });
// // dotenv.config({ path: 'backend/config/config.env' })

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cookieParser());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
// app.use(cors(corsOptions));
// app.use(express.static("public"));

// // Import all routes
// app.get("/", (req, res, next) => {
//   res.status(401).json({
//     success: false,
//     message: "Login first to access this resource.",
//   });
//   //return next(new ErrorHandler("Login first to access this resource.", 401));
// });
// app.use("/api", require("./routes/auth"));

// app.use(errorMiddleware);
// const port = process.env.PORT;
// app.listen(port, () => console.log(`SERVER STARTED AT PORT: ${port}`));

// process.on("unhandledRejection", (err) => {
//   console.log(`ERROR: ${err.stack}`);
//   console.log("Shutting down the server due to Unhandled Promise rejection");
//   server.close(() => {
//     process.exit(1);
//   });
// });
require("./server");
