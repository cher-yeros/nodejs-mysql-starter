const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const HowTo = require("./HowTo");
const Course = require("./Course");
const User = require("./User");

const Suggestion = connection.define("Suggestion", {}, { timestamps: true });
Course.hasMany(Suggestion);
User.hasMany(Suggestion);
HowTo.hasMany(Suggestion);

module.exports = Suggestion;
