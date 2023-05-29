const { DataTypes } = require("sequelize");
const connection = require("../utils/db_connection");
const Role = require("./Role");
const User = require("./User");

User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

module.exports = { User, Role };

switch (process.env.NODE_ENV) {
  case "developement":
    connection.sync();
    break;
  case "MIGRATION":
    connection.sync({ force: true });
    break;
}
