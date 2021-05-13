const Sequelize = require("sequelize")
const db = require("../db")

class Payment extends Sequelize.Model {}

Payment.init(
  {
    fullName: {
      type: Sequelize.STRING,
    },
    cardType: {
      type: Sequelize.STRING,
    },
    ccNumber: {
      type: Sequelize.STRING,
      isCreditCard: true
    },
    secCode: {
      type: Sequelize.INTEGER,
    },
    expirationMonth: {
        type: Sequelize.INTEGER,
    },
    expirationYear: {
        type: Sequelize.INTEGER,
    },
    hiddenNumber: {
      type: Sequelize.VIRTUAL,
      get: function () {
        return this.ccNumber
          ? Array(this.ccNumber.length - 4)
              .fill("*")
              .join("") + this.ccNumber.slice(-4)
          : ""
      },
    },
  },
  { sequelize: db, modelName: "payment" }
)

module.exports = Payment
