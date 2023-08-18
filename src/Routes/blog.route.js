const express = require("express");
const router = express.Router();
const { requireSignin, authMiddleware } = require("../Middlewares/auth");
const validate = require("../Middlewares/validate");
const { blogValidation } = require("../Validation");
const { blogController } = require("../Controllers");
// const { fileUpload } = require("../Utils/fileUpload");

router
	.route("/")
	.post(
		requireSignin,
		authMiddleware,
		[validate(blogValidation.createBlog)],
		blogController.createBlog,
	)
	.get(requireSignin, authMiddleware, blogController.getAllBlogs);
router
	.route("/:blogId")
	.patch(
		// fileUpload.single("featureImage"),
		requireSignin,
		authMiddleware,
		[validate(blogValidation.updateBlog)],
		blogController.updateBlog,
	)
	.get(
		requireSignin,
		authMiddleware,
		[validate(blogValidation.getSingleBlog)],
		blogController.getSingleBlog,
	)
router
    .route("/delete/blog/:blogId/user/:userId")
	.delete(
		requireSignin,
		authMiddleware,
		[validate(blogValidation.deleteBlog)],
		blogController.deleteBlog,
	);
router
	.route("/top/four/blogs")
	.get(requireSignin, authMiddleware, blogController.topFourBlogs);
router
	.route("/random/blogs")
	.get(requireSignin, authMiddleware, blogController.randomBlogs);

module.exports = router;
