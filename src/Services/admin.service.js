/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const { Admin } = require("../Models");
const ApiError = require("../Utils/ApiError");
const generateJwtToken = require("../Config/generateToken");
const bcrypt = require("bcryptjs");

/**
 * ! Create a user
 * ? params //! {Object} //! {userBody}
 * ? @returns {Promise<Admin>}
 */

const register = async (userBody) => {
	try {
		// console.log('userbody:', userBody);
		return await Admin.create(userBody);
	} catch (error) {
		// console.error("Errir in registery", error)
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
/**
 * ! Login a user
 * ? params //! {userBody}
 * ? @returns {Promise<Admin>} //!{token , result}
 */

const login = async (userBody) => {
	const user = await Admin.findOne({ email: userBody.email });
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}
	const checkPassword = await user.isPasswordMatch(userBody.password);
	if (!checkPassword) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials Invalid");
	}

	const token = generateJwtToken(user._id, "admin");
	const result = { token, user };
	return result;
};

/**
 * ! update a password
 * ? params //! {userBody , userId}
 * ? @returns {Promise<Admin>} //!{updateduser}
 */

const updatePassword = async (body, userId) => {
	try {
		const userMember = await Admin.findById(userId);
		if (!userMember) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
		}
		const checkPassword = await Admin.isPasswordMatch(body.password);
		if (!checkPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Password");
		}

		const hashPassword = await bcrypt.hash(body.newPassword, 10);
		const updateUser = await Admin.findOneAndUpdate(
			{ _id: userId },
			{ $set: { password: hashPassword } },
			{ new: true },
		);
		return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	register,
	login,
	updatePassword,
};
