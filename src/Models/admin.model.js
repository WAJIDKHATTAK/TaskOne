/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicareKeyError = require("../Utils/mongoDuplicateKeyError");

const adminSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
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
adminSchema.plugin(toJSON);
adminSchema.plugin(paginate);

/**
 * Check if passowrd matches the users's password
 * @params {string} password
 * @returns {Promise<boolean>}
 */
adminSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

adminSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

mongoDuplicareKeyError(adminSchema);

/**
 * @type of Admin
 */
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
