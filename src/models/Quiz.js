const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const HowTo = require("./HowTo");
const Course = require("./Course");
const User = require("./User");

const Quiz = connection.define(
  "Quiz",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Course.hasMany(Quiz);

module.exports = Quiz;
