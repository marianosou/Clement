const Sequelize = require("sequelize");
const db = require("../db");

class Product extends Sequelize.Model { }

Product.init({
    name: {
        type: Sequelize.STRING
    },
    brand: {
        type: Sequelize.STRING
    },
    region: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price:{
        type: Sequelize.INTEGER
    },
    size: {
        type: Sequelize.STRING
    },
    stock: {
        type: Sequelize.INTEGER
    },
    discount: {
        type: Sequelize.INTEGER
    },
    urlPicture: {
        type: Sequelize.STRING
    }
}, { sequelize: db, modelName: "product" })

module.exports = Product