const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const errorMiddleware = require("./src/middlewares/errors");
const ErrorHandler = require("./src/utils/errorHandler");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://192.168.1.5:3000",
    "http://192.168.1.12:3001",
    "http://192.168.1.102:3000",
    "http://192.168.1.102:3001",
  ],
  credentials: true,
  // optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

// Rejecting access to the server
app.get("/", (req, res, next) => {
  return next(new ErrorHandler("Forbidden area to access", 401));
});

// Import all routes
app.use("/api", require("./src/routes/auth"));

app.use(errorMiddleware);

module.exports = app;
