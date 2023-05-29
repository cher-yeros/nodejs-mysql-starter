const { Sequelize } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectModule: require("mysql2"),
    dialectOptions: {
      connectTimeout: 100000,
    },
    logging: false,
  }
);

connection
  .authenticate()
  .then(() => console.log("\nDATABASE CONNECTED!\n"))
  .catch((err) => console.log("There is an error connecting db =>", err));

module.exports = connection;

//console.log(require('crypto').randomBytes(24).toString('hex'));
