const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.route");
const userRoute = require("./user.route");
const blogRoute = require("./blog.route");

const defaultRoutes = [
	{
		path: "/admin",
		route: adminRoute,
	},
	{
		path: "/user",
		route: userRoute,
	},
	{
		path: "/blog",
		route: blogRoute,
	}
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
