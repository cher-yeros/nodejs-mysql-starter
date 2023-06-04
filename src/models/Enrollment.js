const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");
const Payment = require("./Payment");
const User = require("./User");

const Enrollment = connection.define(
  "Enrollment",
  {
    date: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    expDate: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Course.hasMany(Enrollment);
User.hasMany(Enrollment);
Payment.hasMany(Enrollment);
module.exports = Enrollment;
