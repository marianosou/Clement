const { Payment } = require("../models")

const getPayments = (req, res) => {
    Payment.findAll({
        where: {
            userId: req.params.id
        }
    }).then((payments) => {
        res.status(200).json(payments)
    }).catch((err) => {
        console.log("err", err)
        res.sendStatus(400)
    })
}

const addPayment = (req, res) => {
    Payment.findOne({
        where: {
            ccNumber: req.body.ccNumber,
        },
    }).then((payment) => {
        if (!payment) {
            Payment.create(req.body)
                .then(paymentCreated => paymentCreated.setUser(req.body.userId))
                .then((paymentCreated) => res.status(201).json(paymentCreated))
        } else {
                res.status(400).send("Tarjeta Existente")
        }
    })
}

const deletePayment = (req, res) => {
    Payment.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.status(200).json()
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const updatePayment = (req, res) => {
    Payment.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        plain: true
    }).then((paymentUpdated) => {
        res.status(200).json(paymentUpdated[1])
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

module.exports = { getPayments, addPayment, deletePayment, updatePayment}