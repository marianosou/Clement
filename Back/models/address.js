const Sequelize = require("sequelize");
const db = require("../db");

class Address extends Sequelize.Model { }

Address.init({
    address: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.INTEGER
    },
}, { sequelize: db, modelName: "address" })

module.exports = Address