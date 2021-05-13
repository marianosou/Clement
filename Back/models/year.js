const Sequelize = require("sequelize");
const db = require("../db");

class Year extends Sequelize.Model {}

Year.init({
    name:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, { sequelize: db, modelName: "year" });

module.exports = Year;