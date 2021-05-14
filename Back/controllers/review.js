const { Review } = require("../models");

const addReview = (req, res) => {
    Review.findOne({
        where: {
            productId: req.body.productId,
            userId: req.body.userId
        }
    }).then(review => {
        if (!review) {
            Review.create(req.body)
                .then(reviewCreated => reviewCreated.setUser(req.body.userId))
                .then(reviewCreated => reviewCreated.setProduct(req.body.productId))
                .then(reviewCreated => res.send(201).json(reviewCreated))
        } else {
            console.log("Review Existente")
            res.sendStatus(400)
        }
    });
}

const getReview = (req, res) => {
    Review.findAll({
        where: { productId: req.params.id }
    })
        .then(reviews => res.status(200).json(reviews))
}

module.exports = { addReview, getReview }