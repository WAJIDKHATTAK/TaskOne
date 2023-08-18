const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createBlog = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		postedDate: Joi.string(),
		description: Joi.string().required(),
		createdBy: Joi.string().required(),
	}),
};

const updateBlog = {
	params: Joi.object().keys({
		blogId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		title: Joi.string().optional(),
		postedDate: Joi.string().optional(),
		description: Joi.string().optional(),
	}),
};

const getSingleBlog = {
	params: Joi.object().keys({
		blogId: Joi.required().custom(objectId),
	}),
};

module.exports = {
	createBlog,
	updateBlog,
	getSingleBlog,
};