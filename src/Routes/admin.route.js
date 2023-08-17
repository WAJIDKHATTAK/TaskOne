/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
//? MiddleWares
const { requireSignin, authMiddleware } = require("../Middlewares/auth");
const validate = require("../Middlewares/validate");
//? Validations
const adminValidation = require("../Validation/admin.validation");
//? Controller
const { adminController } = require("../Controllers");

/**
 * validate with Joi,
 * auth Middlware check
 * controller function
 * On first try Comment //! auth middleware function since there is no other admin in the db
 */
router
	.route("/register")
	.post(validate(adminValidation.register), adminController.register);
/**
 * Validate with Joi
 * Controller Function
 * */
router
	.route("/login")
	.post(validate(adminValidation.login), adminController.login);

/**
 * validate with Joi
 * auth Middleware Functions
 * Controller Function
 *  */
router
	.route("/update/password/:userid")
	.patch(
		validate(adminValidation.updatePassword),
		requireSignin,
		authMiddleware,
		adminController.updatePassword
	);

module.exports = router;
