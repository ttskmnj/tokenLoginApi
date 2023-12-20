const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URI);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
