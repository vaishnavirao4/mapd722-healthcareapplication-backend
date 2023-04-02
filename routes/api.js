var express = require("express");
var patientRouter = require("./patient");
var patientRecordRouter = require("./patientrecord");

var app = express();

app.use("/patient/", patientRouter);
app.use("/patient/:patient_id/record/", patientRecordRouter);

module.exports = app;