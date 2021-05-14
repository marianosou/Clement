const router = require("express").Router()
const { createTransactionItem, createTransactionItemLocalStorage, deleteTransactionItem, updateTransactionItem, updateQuantity, loadTransactionItem, getTransactionItems, getTransactionItem } = require("../controllers/transactionitem")

router.post("/", createTransactionItem)
router.post('/localstorage', createTransactionItemLocalStorage)
router.delete("/:id", deleteTransactionItem)
router.put("/", updateTransactionItem)
router.put("/quantity", updateQuantity)
router.put("/load", loadTransactionItem)
router.get("/all/:id", getTransactionItems)
router.get("/:id", getTransactionItem)

module.exports = router
