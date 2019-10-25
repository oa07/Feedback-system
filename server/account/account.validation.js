const joi = require("@hapi/joi");

module.exports.signupDataValidation = data => {
	const compareWith = {
		email: joi
			.string()
			.email({ minDomainSegments: 2 })
			.min(6)
			.required(),
		password: joi
			.string()
			.regex(/^(?=(.*[a-z]){1,})(?=(.*[\d]){1,}).{8,}$/)
			.min(6)
			.required(),
		phoneNumber: joi
			.string()
			.regex(/^[0-9]+$/)
			.length(11)
			.required(),
		role: joi.string().allow(["admin", "researcher", `audience`])
	};
	return joi.validate(data, compareWith, { abortEarly: false });
	// abortEarly: false ==> will gather all the errors. Don't stop immediately when finds one error..
};

module.exports.loginDataValidation = data => {
	const compareWith = {
		email: joi
			.string()
			.email({ minDomainSegments: 2 })
			.required(),
		// joi => .email() only works when .string() exists
		password: joi.required()
	};
	return joi.validate(data, compareWith, { abortEarly: false });
};
