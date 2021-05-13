const Sequelize = require("sequelize");
const db = require("../db");

class Transaction extends Sequelize.Model { }

Transaction.init({
    checkoutDate: {
        type: Sequelize.STRING
    }
}, { sequelize: db, modelName: "transaction" })

module.exports = Transaction