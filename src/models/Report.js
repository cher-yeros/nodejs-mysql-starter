const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const HowTo = require("./HowTo");
const Course = require("./Course");
const User = require("./User");

const Report = connection.define(
  "Report",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Course.hasMany(Report);
User.hasMany(Report);
HowTo.hasMany(Report);

module.exports = Report;
