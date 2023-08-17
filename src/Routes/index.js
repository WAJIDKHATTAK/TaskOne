/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.route");

const defaultRoutes = [
	{
		path: "/admin",
		route: adminRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
