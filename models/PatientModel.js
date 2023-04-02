var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	mobile: {type: String},
	gender: {type: String, required: true},
	age: {type: Number, required: true},
	address: {type: String},
	condition: {type: String, enum: ['normal', 'critical'], default:'normal'},
}, {timestamps: true});

module.exports = mongoose.model("Patient", PatientSchema);