const { TransactionItem, Transaction, Product } = require("../models")

const createTransactionItem = (req, res) => {
    TransactionItem.findOne({
        where: {
            transactionId: req.body.transactionId,
            productId: req.body.productId,
        },
    })
        .then((transactionItem) => {
            if (!transactionItem) {
                TransactionItem.create(req.body)
                    .then(transactionItemCreated => transactionItemCreated.setTransaction(req.body.transactionId))
                    .then(transactionItemCreated => transactionItemCreated.setProduct(req.body.productId))
                    .then((transactionItemCreated) => res.send(transactionItemCreated))
            } else {
                transactionItem
                    .update({
                        quantity:
                            Number(req.body.quantity) + Number(transactionItem.quantity),
                    })
                    .then((transactionItemUpdated) => res.status(200).json(transactionItemUpdated))
            }
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const createTransactionItemLocalStorage = (req, res) => {
    const array = req.body.array;
    let index = array.length;
    console.log(req.body.transactionId)

    array.map(item => {
        console.log(item)
        TransactionItem.findOne({
            where: {
                transactionId: req.body.transactionId,
                productId: item.productId,
            },
        })
            .then((transactionItem) => {
                if (!transactionItem) {
                    TransactionItem.create(item)
                        .then(transactionItemCreated => transactionItemCreated.setTransaction(req.body.transactionId))
                        .then(transactionItemCreated => transactionItemCreated.setProduct(item.productId))
                        .then(() => {
                            index--
                            index === 0 && res.sendStatus(200);
                        })
                        .catch(err => console.log(err))
                } else {
                    transactionItem
                        .update({
                            quantity:
                                Number(item.quantity) + Number(transactionItem.quantity),
                        })
                        .then(() => {
                            index--
                            index === 0 && res.sendStatus(200);
                        })
                }
            }).catch((err) => {
                console.log(err)
                res.sendStatus(400)
            })
    })
}

const deleteTransactionItem = (req, res) => {
    TransactionItem.destroy({
        where: { id: req.params.id },
    }).then(() => {
        res.status(200).json()
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

const updateTransactionItem = (req, res) => {
    TransactionItem
        .update(
            {
                quantity: req.body.quantity,
                reviewed: true
            },
            {
                where: { id: req.body.id },
                returning: true,
                plain: true
            })
        .then((transactionItemUpdated) => {
            res.status(200).json(transactionItemUpdated[1])
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const updateQuantity = (req, res) => {
    TransactionItem
        .update(
            {
                quantity: req.body.quantity,
            },
            {
                where: { id: req.body.id },
                returning: true,
                plain: true
            })
        .then((transactionItemUpdated) => {
            res.status(200).json(transactionItemUpdated[1])
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const loadTransactionItem = (req, res) => {
    TransactionItem.findAll({
        where: { transactionId: req.body.transactionId },
        include: {
            model: Product,
            order: ["name"]
        },
    })
        .then((transactionItems) => {
            transactionItems = transactionItems.map((item) => {
                return {
                    id: item.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    name: item.product.name,
                    price: item.product.price,
                    urlPicture: item.product.urlPicture,
                }
            })
            res.status(200).json(transactionItems)
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
}

const getTransactionItems = (req, res) => {
    TransactionItem.findAll({
        include: [{
            model: Transaction,
            where: { userId: req.params.id }
        }, Product],
    }).then((transactionItems) => {
        res.status(201).json(transactionItems)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

const getTransactionItem = (req, res) => {
    TransactionItem.findOne({
        include: [{
            model: Transaction,
            where: {
                userId: req.params.id,
                checkoutDate: null
            },
        }, Product],
    }).then((openTransactionItems) => {
        res.status(201).json(openTransactionItems)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
}

module.exports = { createTransactionItem, createTransactionItemLocalStorage, deleteTransactionItem, updateTransactionItem, updateQuantity, loadTransactionItem, getTransactionItems, getTransactionItem }