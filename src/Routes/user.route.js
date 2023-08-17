const express = require("express");
const router = express.Router();
//? MiddleWares
const { requireSignin, restrict } = require("../Middlewares/auth");
const validate = require("../Middlewares/validate");
//? Validations
const userValidation = require("../Validation/user.validation");
//? Controller
const { userController } = require("../Controllers");

router
    .route("/register")
    .post(
        validate(userValidation.register),
        userController.register
    );

router
    .route("/login")
    .post(
        validate(userValidation.login),
        userController.login
    );

router
    .route("/update/password/:userId")
    .patch(
        requireSignin,
        restrict("manageUsers"),
        validate(userValidation.updatePassword),
        userController.updatePassword
    );

router.route("/").get(requireSignin,validate(userValidation.getAllUsers),userController.getAllUser)

router
	.route("/:userId")
	.get(
		requireSignin,
		validate(userValidation.getUserById),
		userController.getUserById,
	)
	.patch(
		requireSignin,
		restrict("manageUsers"),
		validate(userValidation.updateUser),
		userController.updateUser,
	)
	.delete(
		requireSignin,
		restrict("manageUsers"),
		validate(userValidation.deleteUser),
		userController.deleteUser,
	);


module.exports = router;
