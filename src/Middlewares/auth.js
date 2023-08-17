/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/ApiError");
const config = require("../Config/config");
const { Admin } = require("../Models");

const requireSignin = (req, res, next) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.verify(token, config.JWT_SECRET);
		req.user = user;
	} else {
		throw new ApiError(httpStatus.BAD_REQUEST, "Authorization Required");
	}
	next();
};

const authMiddleware = (req, res, next) => {
	if (req.user.role !== "admin") {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"You Do Not Have Access Rights",
		);
	}
	next();
};

module.exports = {
	requireSignin,
	authMiddleware,
};