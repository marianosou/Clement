const router = require("express").Router()
const { getUsers, updateUser, deleteUser, register, login, getToken, getAdminAll, amdminUpdateUser } = require("../controllers/user")
const { checkToken } = require("../middlewares/jswt")
const { checkAdmin } = require("../middlewares/isAdmin")

router.get("/admin/all/:id/:isAdmin", checkAdmin, getUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.post("/register", register)
router.post("/login", login)
router.get("/private/:token", checkToken, getToken)
router.get("/admin", getAdminAll)
router.put("/admin/updateuser", amdminUpdateUser)

module.exports = router