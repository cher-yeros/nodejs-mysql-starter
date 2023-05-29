const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const User = connection.define("User", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email address already in use!",
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "phone must be unique.",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
