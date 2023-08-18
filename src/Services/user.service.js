/* eslint-disable no-mixed-spaces-and-tabs */
const httpStatus = require("http-status");
const { User } = require("../Models");
const ApiError = require("../Utils/ApiError");
const generateJwtToken = require("../Config/generateToken");

const register = async (userBody) => {
	try {
		return await User.create(userBody);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const login = async (userBody) => {
	const user = await User.findOne({ email: userBody.email });
	if (!user) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials invalid");
	}
	const checkPassword = await user.isPasswordMatch(userBody.password);
	if (!checkPassword) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Credentials invalid");
	}
	const token = generateJwtToken(user._id, user.role);
	const result = { token, user };
	return result;
};
const updatePassword = async (body,userId) => {
	try {
		let userMember = await User.findById(userId);
		if (!userMember) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No user found");
		}
		console.log("hello")
		console.log(userMember);
		const checkPassword = await userMember.isPasswordMatch(body.password);
		if (!checkPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Password invalid");
		}
		userMember.password = body.newPassword;
		const updateUser = await userMember.save();
		return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const getAllUsers = async (filter, options) => {
	try {
		const user = await User.paginate(filter, options);
		return user;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const getUserById = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
		}
		return user;
	} catch (error) {
		throw new ApiError(httpStatus.BAD_REQUEST, "No User Found");
	}
};
const updateUser = async (userId,body) => {
	try {
		const updateUser = User.findOneAndUpdate(
			{ _id: userId },
			{ $set: body },
			{ new: true }
		  );
		//   console.log("updated user : ", updateUser)
		  return updateUser;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};
const deleteUser = async (userId) => {
	try {
		const user = await getUserById(userId);
		if (!user) {
			throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
		}
		await user.remove();
		return user;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
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
