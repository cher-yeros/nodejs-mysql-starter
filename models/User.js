const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");

const User = connection.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your first name",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your last name",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notNull: {
          msg: "Please enter your user name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        notNull: {
          msg: "Please enter your email",
        },
        isEmail: { args: true, msg: "Must be a valid email address" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "phone must be unique.",
      },
      validate: {
        notNull: {
          msg: "Please enter your phone number",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your password",
        },
      },
    },
    erp: { type: DataTypes.STRING, allowNull: false },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    firstTime: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["username", "email", "phone"],
      },
    ],
  }
);

module.exports = User;
