const { User } = require("../models")
const jswt = require("jsonwebtoken")
const { Op } = require("sequelize")

const getUsers = (req, res) => {
    User.findAll({
      where: { id: { [Op.ne]: req.params.id } }, // Menos el del req.params.id
    })
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
}
  
const updateUser = (req, res) => {
    User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    })
      .then((userUpdated) => {
        res.status(200).json(userUpdated[1])
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
}
  
const deleteUser = (req, res) => {
    User.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.status(200).send()
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
}
  
const register = (req, res) => (
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) { res.status(401).send("Email address already in use.") }
      else {
        User.create(req.body)
          .then((user) => {
            const token = jswt.sign(
              { id: user.id, isAdmin: user.isAdmin },
              "ecommerce"
            )
            res.status(201).json({ token, user })
          })
      }
    })
)
  
const login = (req, res) => {
    const { email, password } = req.body
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (!user || !user.validPassword(password)) {
        return res.status(401).send("Invalid email or password")}
      else {
        const token = jswt.sign(
          { id: user.id, isAdmin: user.isAdmin },
          "ecommerce"
        )
        res.status(200).json({ token, user })
      }
    })
}
  
const getToken = (req, res) => {
    res.status(200).send(req.user)
  }

const getAdminAll = (req, res) => {
    User.findAll()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        res.status(500)
      })
}
  
const amdminUpdateUser = (req, res) => {
    const { id, isAdmin } = req.body
    User.update(
      { isAdmin: !isAdmin },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    )
      .then((updatedUser) => res.send(updatedUser[1]))
      .catch((err) => console.log(err))
}
  
module.exports = { getUsers, updateUser, deleteUser, register, login, getToken, getAdminAll, amdminUpdateUser }