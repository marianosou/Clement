const router = require("express").Router()
const { getPayments, addPayment, deletePayment, updatePayment} = require("../controllers/payment")

router.get("/:id", getPayments)
router.post("/", addPayment)
router.delete("/:id", deletePayment)
router.put("/:id", updatePayment)

module.exports = router;