const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres://postgres@localhost/ecommerce", {
    logging: false, 
    dialect: "postgres" 
})

module.exports = sequelize