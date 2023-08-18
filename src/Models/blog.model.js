/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const mongoDuplicateKeyError = require("../Utils/mongoDuplicateKeyError");

const blogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		coverImage: {
			type: String,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin",
			required: true,
		},
		postedDate: {
			type: Date,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	},
);

blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

mongoDuplicateKeyError(blogSchema);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
