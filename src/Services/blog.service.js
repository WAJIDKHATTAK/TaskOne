/* eslint-disable no-mixed-spaces-and-tabs */
const httpStatus = require("http-status");
const { Blog , Admin } = require("../Models");
const ApiError = require("../Utils/ApiError");
const config = require("../Config/config");

const createBlog = async (blogBody) => {
	try {
		const blog = await Blog.create(blogBody);
		const admin = await Admin.findByIdAndUpdate(
			blogBody.createdBy,
            {$addToSet: {mybloglist: blog._id}},
			{new: true}
		)
		return blog,admin;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const getAllBlogs = async (filter) => {
	try {
		const blogs = await Blog.find(filter);
		if (blogs.length <= 0) {
			return blogs;
		}
		blogs.forEach((data) => {
			if (data?.featureImage) {
				data.featureImage = config.rootPath + "/" + data.featureImage;
			}
		});
		return blogs;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const updateBlog = async (blogBody, blogId) => {
	try {
		const result = await Blog.findByIdAndUpdate(
			blogId,
			{ $set: blogBody },
			{ new: true },
		);
		if (!result) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No blog found");
		}
		return result;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const getSingleBlog = async (blogId) => {
	try {
		const blog = await Blog.findById(blogId);
		if (!blog) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No blog found");
		}
		if (blog?.featureImage) {
			blog.featureImage = config.rootPath + "/" + blog.featureImage;
		}
		return blog;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const deleteBlog = async (blogId) => {
	try {
		const blog = await Blog.findByIdAndRemove(blogId);
		if (!blog) {
			throw new ApiError(httpStatus.BAD_REQUEST, "No blog found");
		}
		return blog;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const topFourBlogs = async () => {
	try {
		return await Blog.find({}).sort({ createdAt: -1 }).limit(4);
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

const randomBlogs = async () => {
	try {
		const blogs = await Blog.aggregate([
			{ $sample: { size: 4 } }, // Get four random document
		  ]);
		  return blogs;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
	}
};

module.exports = {
	createBlog,
	getAllBlogs,
	updateBlog,
	getSingleBlog,
	deleteBlog,
	topFourBlogs,
	randomBlogs,
};
