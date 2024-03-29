require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.MYSQL_PW,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.USER,
    password: process.env.MYSQL_PW,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.USER,
    password: process.env.MYSQL_PW,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
  },
};
