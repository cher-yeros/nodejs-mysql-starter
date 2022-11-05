const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Role = require("./Role");
const User = require("./User");

const User_Role = connection.define(
  "User_Role",
  { active: { type: DataTypes.BOOLEAN, defaultValue: true } },
  { timestamps: false }
);

User.belongsToMany(Role, { through: User_Role });
Role.belongsToMany(User, { through: User_Role });

module.exports = { User, Role, User_Role };

// connection.sync({ force: true });
