const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const {roles} = require("./../Config/role")
const mongoDuplicareKeyError = require("../Utils/mongoDuplicateKeyError");

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "Enter your first name."],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, "Enter your first name."],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please Enter Email."],
			unique: [true, "Email Already Registered."],
			trim: true,
			lowercase: true,
		},
		role: {
			type: String,
			enum: roles,
			default: 'user',
		},
		password: {
			type: String,
			required: [true, "Please enter password"],
			trim: true,
			private: true, // used by the toJSON plugin
		},
		userName: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

//TODO Plugin to convert schema to JSON
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

mongoDuplicareKeyError(userSchema);

/**
 * @typedef User
 */
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
