const Sequelize = require("sequelize");
const db = require("../db");

class Review extends Sequelize.Model { }

Review.init({
    comment: {
        type: Sequelize.TEXT
    },
    rating: {
        type: Sequelize.INTEGER
    }
}, { sequelize: db, modelName: "review" })

module.exports = Review