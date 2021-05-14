const router = require("express").Router()
const { checkAdmin } = require("../middlewares/isAdmin");
const { getTypes, addType, deleteType, updateType, getYears, addYear, deleteYear, updateYear, getCountries, addCountry, deleteCountry, updateCountry } = require("../controllers/category")

router.get('/types', getTypes);
router.post('/types/:isAdmin', checkAdmin, addType)
router.delete('/types/:id/:isAdmin', deleteType)
router.put('/types/:id/:isAdmin', checkAdmin, updateType)

router.get('/years', getYears);
router.post('/years/:isAdmin', checkAdmin, addYear)
router.delete('/years/:id/:isAdmin',deleteYear);
router.put('/years/:id/:isAdmin', checkAdmin, updateYear)

router.get('/countries', getCountries);
router.post('/countries/:isAdmin', checkAdmin, addCountry);
router.delete('/countries/:id/:isAdmin', deleteCountry);
router.put('/countries/:id/:isAdmin', checkAdmin, updateCountry)

module.exports = router;