/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const config = require("../Config/config");
const userService = require("./user.service");
const { Token } = require("../Models");
const { tokenTypes } = require("../Config/tokens");
const { v4: uuidv4 } = require("uuid");
var ObjectId = require("mongoose").Types.ObjectId;

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, email) => {
	const uuid = uuidv4();
	const tokenDoc = await Token.create({
		token,
		user: userId,
		expires: expires.toDate(),
		type,
		uid: uuid,
		email,
	});
	return tokenDoc;
};

const checkForces = async (id) => {
	const found = await Token.find({ uid: id.ud });
	return found;
};

const verifyToken = async (token, type) => {
	const payload = jwt.verify(token, config.jwt.secret);
	const tokenDoc = await Token.findOne({
		token,
		type,
		user: payload.sub,
		blacklisted: false,
	});
	if (!tokenDoc) {
		throw new Error("Token not found");
	}
	return tokenDoc;
};

const generateAuthTokens = async (user, forced) => {
	let accessTokenExpires;
	let refreshTokenExpires;
	if (forced === "APP") {
		accessTokenExpires = moment().add(1, "years");
		refreshTokenExpires = moment().add(1, "years");
	} else {
		accessTokenExpires = moment().add(
			config.jwt.accessExpirationMinutes,
			"hours",
		);
		refreshTokenExpires = moment().add(
			config.jwt.refreshExpirationDays,
			"hours",
		);
	}
	const accessToken = generateToken(
		user.id,
		accessTokenExpires,
		tokenTypes.ACCESS,
	);
	const refreshToken = generateToken(
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH,
	);
	let new_token = await saveToken(
		refreshToken,
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH,
		user.email,
	);
	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires,
			uuid: new_token.uid,
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires,
			uuid: new_token.uid,
		},
	};
};

module.exports = {
	generateToken,
	saveToken,
	verifyToken,
	generateAuthTokens,
	checkForces,
  };
