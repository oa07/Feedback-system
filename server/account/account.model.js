const mongoose = require("mongoose");

const { Schema } = mongoose;

const AccountSchema = new Schema({
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},

	verifyAccountToken: {
		type: String
	},
	isAccountVerified: {
		type: Boolean,
		default: false
	},
	isAccountActive: {
		type: Boolean,
		default: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

module.exports.AccountModel = mongoose.model("Account", AccountSchema);
