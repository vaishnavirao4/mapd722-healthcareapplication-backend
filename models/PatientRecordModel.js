var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PatientRecordSchema = new Schema({
	date_time: {type: Date},
	data_type: {type: String, enum: ['blood_pressure', 'respiratory_rate', 'blood_oxygen_level', 'heartbeat_rate']},
	reading:{ type: Object},
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
}, {timestamps: true});

module.exports = mongoose.model("PatientRecord", PatientRecordSchema);