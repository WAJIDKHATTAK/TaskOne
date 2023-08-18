/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const httpStatus = require("http-status");
const catchAsync = require("../Utils/catchAsync");
const { blogService } = require("../Services");
const ApiError = require("./../Utils/ApiError");

const createBlog = catchAsync(async (req, res) => {
	let body = req.body;
	const { _id } = req.user;
	body.createdBy = _id;
	const blog = await blogService.createBlog(body);
	res.status(httpStatus.CREATED).send(blog);
});
const getAllBlogs = catchAsync(async (req, res) => {
	let filter = {};
	if (req.query.search) {
		filter = {
			$or: [
				{ title: { $regex: req.query.search, $options: "i" } },
				{ description: { $regex: req.query.search, $options: "i" } },
			],
		};
	}
	const blog = await blogService.getAllBlogs(filter);
	res.status(httpStatus.CREATED).send(blog);
});
const updateBlog = catchAsync(async (req, res) => {
	let body = req.body;
	if (req.file) {
		body.featureImage = req.file.filename;
	}
	const { blogId } = req.params;
	const blog = await blogService.updateBlog(body, blogId);
	res.status(httpStatus.CREATED).send(blog);
});
const getSingleBlog = catchAsync(async (req, res) => {
	const { blogId } = req.params;
	const blog = await blogService.getSingleBlog(blogId);
	res.status(httpStatus.CREATED).send(blog);
});
const deleteBlog = catchAsync(async (req, res) => {
	const blogId = req.params.blogId;
	const userId = req.params.userId;
	const blog = await blogService.deleteBlog(blogId,userId);
	res.status(httpStatus.CREATED).send(blog);
});
const topFourBlogs = catchAsync(async (req, res) => {
	const blog = await blogService.topFourBlogs();
	res.status(httpStatus.CREATED).send(blog);
});
const randomBlogs = catchAsync(async (req, res) => {
	const blog = await blogService.randomBlogs();
	res.status(httpStatus.CREATED).send(blog);
  });
module.exports = {
	createBlog,
	getAllBlogs,
	updateBlog,
	getSingleBlog,
	deleteBlog,
	topFourBlogs,
	randomBlogs,
};
