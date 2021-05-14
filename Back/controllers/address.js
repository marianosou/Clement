const { Address } = require("../models")

const getAddress = (req, res) => {
    Address.findAll({
        where: {
            userId: req.params.id
        }
    }).then((address) => {
        res.status(200).json(address)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

const addAddress = (req, res) => {
    Address.create(req.body)
        .then((addressCreated) => addressCreated.setUser(req.body.userId))
        .then((addressCreated) => {
            res.status(201).json(addressCreated)
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const deleteAddress = (req, res) => {
    Address.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.status(200).json()
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const updateAddress = (req, res) => {
    Address.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
    }).then((addressUpdated) => {
        res.status(200).json(addressUpdated[1])
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

module.exports = { getAddress, addAddress, deleteAddress, updateAddress }