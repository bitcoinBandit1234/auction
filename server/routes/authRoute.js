const router = require("express").Router()
const {registerUser, loginUser, isAuthenticated, logoutUser} = require('../controller/auth_controller')
const validate = require("../helper/validation.js");
const makePayment = require("../controller/payment_controller.js")

router.post('/register',validate ,registerUser);
router.route('/login').get(isAuthenticated).post(loginUser);
router.get('/logout', logoutUser);
router.post('/payment', makePayment);

module.exports = router;