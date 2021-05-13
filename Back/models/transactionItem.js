const Sequelize = require("sequelize");
const db = require("../db");

class TransactionItem extends Sequelize.Model { }

TransactionItem.init({
    quantity: {
        type: Sequelize.INTEGER
    },
    reviewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, { sequelize: db, modelName: "transaction_item" })

module.exports = TransactionItem