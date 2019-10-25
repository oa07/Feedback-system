const bcrypt = require("bcrypt");
const passport = require("passport");
const { AccountModel } = require("./account.model");
const {
	signupDataValidation,
	loginDataValidation
} = require("./account.validation");

/*
  HTTP Status Codes
  https://www.restapitutorial.com/httpstatuscodes.html
  200 => OK
  400 => Bad Request
  404 => Not Found
  406 => Not Acceptable
*/
module.exports.register = async (req, res, next) => {
	try {
		const data = req.body;
		const { error } = signupDataValidation(data);
		if (error)
			return res.status(400).json(error.details.map(err => err.message));
		const { role } = data;
		if (role !== "admin" && role !== "researcher" && role !== "audience") {
			return res.status(400).json({
				message: 'Choose designation between "admin", "researcher" & "audience"'
			});
		}
		let user = await AccountModel.findOne({ email: data.email });
		if (user) return res.status(400).json({ message: "Email already Exists" });
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const newUser = new AccountModel({
			email: data.email,
			phoneNumber: data.phoneNumber,
			role: data.role,
			password: hashedPassword
		});
		await newUser.save();
		return res
			.status(200)
			.json({ message: "Registration Successful", data: newUser });
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// Testing DONE
// POST /auth/login
// input => email, password
module.exports.login = async (req, res, next) => {
<<<<<<< HEAD
	const { error } = loginDataValidation(req.body);
	if (error) return res.status(400).json(error.details.map(err => err.message));

	try {
		passport.authenticate("login", async (err, token, user, info) => {
			if (err) return res.status(400).json(err);
			if (info) return res.status(400).json(info);
			return res.status(200).json({ token, user });
		})(req, res, next);
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
=======
	try {
		const { error } = loginDataValidation(req.body);
		if (error)
			return res.status(400).json(error.details.map(err => err.message));

		return res.json({ success: true, data: req.user });
	} catch (error) {
		next(error);
	}
	next();
>>>>>>> 601d1ad97d9ad3652e028373cf9888e0f444b5be
};

// GET /auth/allUserInfo
// only admin can access this page..
module.exports.allUserInfo = async (req, res) => {
	try {
		const users = await AuthModel.find();
		return res.status(200).json({ users });
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// DELETE /auth/deleteAccount
// protected route
module.exports.deleteAccount = async (req, res) => {
	try {
		await AuthModel.findByIdAndDelete({ _id: req.user._id });
		req.user = undefined;
		return res.status(200).json({
			message: "account Deleted Successfully"
		});
		// No logout needed. because there is no user correspondent to the jwt_token.
		// So, just redirect to the login page.
	} catch (err) {
		return res.status(500).json({
			message: "server error"
		});
	}
};

// POST /auth/deactivateAccount
// protected route
