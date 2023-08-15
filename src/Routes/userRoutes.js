const express = require('express')
const router = express.Router()
const User = require("../Controllers/userController")
const protect = require('../Middlewares/authMiddleware')

router.route('/').get(protect , User.GetAllUsers);
router.route("/:id").get(protect , User.GetUserById);
router.route("/update/:id").put(protect , User.UpdateUserById);
router.route("/delete/:id").delete(protect , User.DeleteUserById)

module.exports = router;