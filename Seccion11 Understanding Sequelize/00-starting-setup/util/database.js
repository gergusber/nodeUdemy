const Sequelize = require("sequelize");

const sequalize = new Sequelize("node-complete", "root", "Gergusber2$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequalize;
