const Sequelize = require("sequelize");
const db = require("../db");

class Type extends Sequelize.Model {}

Type.init({
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { sequelize: db, modelName: "type" });

module.exports = Type;