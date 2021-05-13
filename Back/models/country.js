const Sequelize = require("sequelize");
const db = require("../db");

class Country extends Sequelize.Model {}

Country.init({
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { sequelize: db, modelName: "country" });

module.exports = Country;