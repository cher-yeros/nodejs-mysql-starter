const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");
const User = require("./User");

const Comment = connection.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);
Course.hasMany(Comment, { foreignKey: "courseId" });
User.hasMany(Comment, { foreignKey: "userId" });
module.exports = Comment;
