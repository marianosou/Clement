const router = require("express").Router()
const { addReview, getReview} = require("../controllers/review")

router.post('/', addReview)
router.get('/id:', getReview);

module.exports = router;