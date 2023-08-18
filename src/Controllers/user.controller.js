/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const catchAsync = require("../Utils/catchAsync");
const { userService } = require("../Services");
const pick = require("../Utils/pick");
const { objectId } = require("../Validation/custom.validation");

const register = catchAsync(async (req, res) => {
	let body = req.body;
	const user = await userService.register(body);
	res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
	let body = req.body;
	const user = await userService.login(body);
	res.status(httpStatus.CREATED).send(user);
});

const updatePassword = catchAsync(async (req, res) => {
	let body = req.body;
	let userId = req.params.userId;
	const user = await userService.updatePassword(body, userId);
	res.status(httpStatus.CREATED).send(user);
});

const getAllUsers = catchAsync(async (req, res) => {
	const filter = pick(req.query, ["username", "role"]);
	const options = pick(req.query, ["sortBy", "limit", "page"]);
	const result = await userService.getAllUsers(filter, options);
	res.status(httpStatus.CREATED).send(result);
});

const getUserById = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const user = await userService.getUserById(userId);
	res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const body = req.body;
	const user = await userService.updateUser(userId, body);
	res.status(httpStatus.CREATED).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const user = await userService.deleteUser(userId);
	res.status(httpStatus.NO_CONTENT).send();
	return user;
});

module.exports = {
	register,
	login,
	updatePassword,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
