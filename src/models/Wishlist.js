const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Course = require("./Course");
const User = require("./User");

const Wishlist = connection.define("Wishlist", {}, { timestamps: true });
Course.hasMany(Wishlist, { foreignKey: "courseId" });
User.hasMany(Wishlist, { foreignKey: "userId" });
module.exports = Wishlist;
