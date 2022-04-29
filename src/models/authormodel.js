const mongoose = require('mongoose')
//require("mongoose-type-email")
const validator = require('validator')
//const ObjectId = mongoose.Schema.Types.ObjectId


//Schema
const AuthorSchema = new mongoose.Schema({
	firstName: { type: String, required: true,trim :true },
	lastName: { type: String, required: true,trim :true },
	title: {
		type: String, required: true,
		enum: ["Mr", "Mrs", "Miss"]
	},
	email: {
		type: String,
		unique: true,
		required : true},
	// 	validate(value){
	// 		if (!validator.isEmail(value)){
	// 			throw new Error("invalid email");
	// 		}}
	// ,
	password: { type: String, required: true }

})

module.exports = mongoose.model('Author', AuthorSchema)




