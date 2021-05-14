const router = require("express").Router()
const { getAddress, addAddress, deleteAddress, updateAddress } = require("../controllers/address");

router.get("/:id", getAddress)
router.post("/", addAddress)
router.delete("/:id", deleteAddress)
router.put("/:id", updateAddress)

module.exports = router;