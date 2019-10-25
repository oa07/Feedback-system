const jwt = require("jsonwebtoken");
const config = require("../../config/config");
module.exports.auth = async (req, res, next) => {
	try {
		const bearerHeader = req.headers.authorization;
		const access_token = bearerHeader.split(" ")[1];
		const tokenData = jwt.verify(access_token, config.jwtSecret);
		req.user = tokenData;
		next();
	} catch (error) {
		next(error);
	}
	// try {
	// 	const bearerHeader = req.headers.authorization;
	// 	if (typeof bearerHeader !== "undefined") {
	// 		const access_token = bearerHeader.split(" ")[1];
	// 		const tokenData = jwt.verify(accessToken, config.jwtSecret);
	// 		console.log(tokenData);
	// 	}
	// } catch (err) {
	// 	return res.status(500).json({
	// 		message: "internal Server Error"
	// 	});
	// }
};

module.exports.researcherAccess = async (req, res, next) => {
	try {
		if (req.user.role === "researcher") {
			next();
		} else {
			return res.status(401).json({
				success: false,
				message: "No Access Permission. You are not a researcher"
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: "internal Server Error"
		});
	}
};

module.exports.audienceAccess = async (req, res, next) => {
	try {
		if (req.user.role === "audience") {
			next();
		} else {
			return res.status(401).json({
				success: false,
				message: "No Access Permission. You are not a audience"
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: "internal Server Error"
		});
	}
};

module.exports.adminAccess = async (req, res, next) => {
	try {
		if (req.user.role === "admin") {
			next();
		} else {
			return res.status(401).json({
				success: false,
				message: "No Access Permission. You are not a audience"
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: "internal Server Error"
		});
	}
};
