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
	.post(
		validate(adminValidation.register),
		requireSignin,
		authMiddleware,
		adminController.register,
	);
/**
 * Validate with Joi
 * Controller Function
 * */
router
	.route("/login")
	.post(validate(adminValidation.login), adminController.login);

router
    .route("/addToFavourite/user/:userId/post/:postId")
	.post(validate(adminValidation.addToFavourite),adminController.addToFavourite);
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
		adminController.updatePassword,
	);

module.exports = router;
