const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const User = require("./User");
const Quiz = require("./Quiz");

const QuizAnswer = connection.define(
  "QuizAnswer",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Quiz.hasMany(QuizAnswer);
User.hasMany(QuizAnswer);

module.exports = QuizAnswer;
