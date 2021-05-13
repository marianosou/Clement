const Sequelize = require("sequelize")
const db = require("../db")

class User extends Sequelize.Model {}

const crypto = require("crypto")

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: "user" }
)

User.addHook("beforeCreate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex")
  user.password = user.hashPassword(user.password)
})

User.prototype.hashPassword = function (password) {
  return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
}

User.prototype.validPassword = function (loginPassword) {
  return this.password === this.hashPassword(loginPassword)
}

module.exports = User
