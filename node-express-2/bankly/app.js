/** Application for bank.ly */

const express = require("express");
const app = express();
const morgan = require("morgan");
const ExpressError = require("./helpers/expressError");

app.use(express.json());
app.use(morgan("dev"));

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/** 404 handler */

app.use((req, res, next) => {
	const e = new ExpressError("page not found", 404);
	return next(e);
});

/** general error handler */

app.use((e, req, res, next) => {
	let status = e.status || 500;
	let msg = e.msg || e;
	res.status(status).json({
		error: {
			msg,
			status,
		},
	});
});

module.exports = app;
