const mongoose = require('mongoose')
//Schema
const AuthorSchema = new mongoose.Schema({
	fname: { type: String, required: true,trim :true },
	lname: { type: String, required: true,trim :true },
	title: {
		type: String, required: true,
		enum: ["Mr", "Mrs", "Miss"]
	},
	email: {
		type: String,
		unique: true,
		required : true},
	password: { type: String, required: true }

})

module.exports = mongoose.model('Author', AuthorSchema)




