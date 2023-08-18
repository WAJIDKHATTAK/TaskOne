/* eslint-disable no-unused-vars */
const Joi = require("joi");
const { objectId } = require("./custom.validation");

const register = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required(),
		role: Joi.string(),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(32).required(),
	}),
};
const addToFavourite = {
    params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
		postId: Joi.required().custom(objectId),
	})
};
const updatePassword = {
	params: Joi.object().keys({
		userid: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		password: Joi.string().min(8).max(32).required(),
		newPassword: Joi.string().min(8).max(32).required(),
		confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
	}),
};

module.exports = {
	login,
	register,
	addToFavourite,
	updatePassword,
};
