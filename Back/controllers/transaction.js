const { Transaction, TransactionItem, Product, Payment, Address } = require("../models");
const { Op } = require("sequelize");

const createTransaction = (req, res) => {
    Transaction.findOne({
        where: {
            checkoutDate: null,
            userId: req.body.userId
        }
    }).then(transaction => {
        if (!transaction) {
            Transaction.create()
                .then(transactionCreated => transactionCreated.setUser(req.body.userId))
                .then(transactionCreated => res.json(transactionCreated))
        } else {
            return res.json(transaction)
        }
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

const getTransaction = (req, res) => {
    Transaction.findAll({
        where: {
            userId: req.params.id,
            checkoutDate: { [Op.ne]: null }
        }, attributes: ["checkoutDate"],
        include: [{
            model: Payment,
            attributes: ["fullName", "cardType", "ccNumber", "hiddenNumber", "expirationMonth", "expirationYear"]
        }, {
            model: Address,
            attributes: ["address", "country", "city", "state", "zipCode"]
        }, {
            model: TransactionItem,
            attributes: ["quantity"],
            include: {
                model: Product,
                attributes: ["name", "price", "urlPicture"]
            }
        }]
    }).then((transactions) => {
        res.status(201).json(transactions)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

const updateTransaction = (req, res) => {
    Transaction.update(
        { checkoutDate: req.body.checkoutDate },
        {
            where: { id: req.params.id },
            returning: true,
            plain: true,
        },
    ).then(transactionUpdate => transactionUpdate[1].setPayment(req.body.paymentId))
        .then(transactionUpdate => transactionUpdate.setAddress(req.body.addressId))
        .then((transactionUpdated) => {
            res.status(200).json(transactionUpdated)
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

module.exports = { createTransaction, getTransaction, updateTransaction }
