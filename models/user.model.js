const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		minLength: [4, "Username must be atleast 4 characters long"],
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		minLength: [13, "Email must be atleast 13 characters long"],
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: [6, "Passwords must be atleast 6 characters long"],
	},
});

const user = mongoose.model("users", userSchema);

module.exports = user;
