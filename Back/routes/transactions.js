const router = require("express").Router()
const {createTransaction, getTransaction, updateTransaction} = require("../controllers/transaction")

router.post("/",createTransaction)
router.get("/:id", getTransaction)
router.put("/:id", updateTransaction)

module.exports = router;

