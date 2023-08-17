/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.route");
const userRoute = require("./user.route");

const defaultRoutes = [
	{
		path: "/admin",
		route: adminRoute,
	},
	{
		path: "/user",
		route: userRoute,
	}
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
