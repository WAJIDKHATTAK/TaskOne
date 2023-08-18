const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicateKeyError = require("../Utils/mongoDuplicateKeyError");
const { roles } = require("../Config/role");
const Blog = require("./blog.model");

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
		role: {
			type: String,
			enum: roles,
			default: "admin",
		},
		mybloglist: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Blog",
		},
		favouritebloglist: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Blog",
		},
	},
	{
		timestamps: true,
	},
);

//TODO Plugin to convert schema to JSON
adminSchema.plugin(toJSON);
adminSchema.plugin(paginate);

mongoDuplicateKeyError(adminSchema);
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

/**
 * @type of Admin
 */
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
