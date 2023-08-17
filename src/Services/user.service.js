const httpStatus = require("http-status");
const ApiError = require("../Utils/ApiError");
const { tokenTypes } = require("../Config/tokens");
const { User } = require("../Models");
const { Token } = require("../Models");

const register = async (body) => {
	if (await User.isEmailTaken(body.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, "User already Exists");
	}
	return await User.create(body);
};

const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await getUser({ email });
	if (user && user.suspended)
		throw new ApiError(
			httpStatus.SERVICE_UNAVAILABLE,
			"Your account has been suspended, Please contact adminstration!",
		);
	if (!user || !(await user.isPasswordMatch(password))) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			"Incorrect email or password",
		);
	}
	return user;
};

const getUser = async (filter) => {
	return await User.findOne(filter);
};

const logout = async (data) => {
	let refreshToken = data.refreshToken;
	const refreshTokenDoc = await Token.findOne({
		token: refreshToken,
		type: tokenTypes.REFRESH,
		blacklisted: false,
	});
	if (!refreshTokenDoc) {
		await systemConfigService.updateActiveSessionCount(-1);
		throw new ApiError(httpStatus.NOT_FOUND, "Not found");
	}
	await refreshTokenDoc.remove();
};

const changePassword = async (body) => {
	const { email, oldPassword, newPassword } = body;
	const user = await User.findOne({ email: email });
	if (!user) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			"User with the email doesn't exists!",
		);
	}
	const check = await user.isPasswordMatch(oldPassword);
	if (!check) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect Old Password");
	} else {
		user.password = newPassword;
		await user.save();
		const updated = "Password Updated";
		return updated;
	}
};

const resetPassword = async (resetPasswordToken, newPassword) => {
	try {
		const resetPasswordTokenDoc = await tokenService.verifyToken(
			resetPasswordToken,
			tokenTypes.RESET_PASSWORD,
		);
		const user = await userService.getUserById(resetPasswordTokenDoc.user);
		if (!user) {
			throw new Error();
		}
		await userService.updateUserById(user.id, { password: newPassword });
		await Token.deleteMany({
			user: user.id,
			type: tokenTypes.RESET_PASSWORD,
		});
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
	}
};

const resetPasswordviaEmail = async (email, newPassword) => {
	try {
		const user = await userService.getUserByEmail(email);
		// if (!user || !(await user.isPasswordMatch(oldPassword))) {
		//   throw new Error();
		// }
		await userService.updateUserById(user.id, { password: newPassword });
		const result = "Password Updated";
		return result;
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
	}
};

const getUserById = async (id) => {
	return await getUser({ id });
};

const updateUser = async (id, body) => {
	const user = await getUser({ id });
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	Object.assign(user, body);
	return await user.save();
};

const deleteUser = async (id) => {
	const user = await getUser({ id });
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	await user.remove();
};

const queryUsers = async (filter, options) => {
	return await User.paginate(filter, options);
  };

  module.exports = {
	loginUserWithEmailAndPassword,
	logout,
	resetPassword,
	resetPasswordviaEmail,
	changePassword,
	getUserById,
	updateUser,
	deleteUser,
	queryUsers,
	register,
  };