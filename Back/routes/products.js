const router = require("express").Router()
const {addProduct, searchProducts, getProducts, getProduct, updateProduct, deleteProduct} = require("../controllers/product")
const { checkAdmin } = require('../middlewares/isAdmin');

router.post("/", addProduct)
router.get("/search", searchProducts)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id/:isAdmin", checkAdmin, updateProduct)
router.delete("/admin/delete/:id", deleteProduct)

module.exports = router;