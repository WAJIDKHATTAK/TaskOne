const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const register = {
    body:Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(password),
		role: Joi.string(),
    }),
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};
const updatePassword = {
    params: Joi.object().keys({
        userId : Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
        newPassword: Joi.string().required().custom(password),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
};
const getAllUsers = {
	query: Joi.object().keys({
		username: Joi.string(),
		role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
	})
};
const getUserById = {
	params:Joi.object().keys({
        userId:Joi.string().required().custom(objectId)
    }),
}
const updateUser = {
	params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		email: Joi.string().email(),
		password: Joi.string().custom(password),
		firstName: Joi.string(),
		lastName: Joi.string(),
		userName: Joi.string(),
	}),
};
const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

module.exports = {
	register,
	login,
	updatePassword,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
