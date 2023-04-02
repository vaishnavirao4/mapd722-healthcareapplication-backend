const Patient = require("../models/PatientModel");
const PatientRecord = require("../models/PatientRecordModel");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * PatientRecord List.
 *
 * @returns {Object}
 */
exports.patientRecordList = (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.patient_id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid Patient ID"
      );
    }
    PatientRecord.find({patient: req.params.patient_id}).then((patientRecords) => {
      if (patientRecords.length > 0) {
        return apiResponse.successResponseWithData(res, "success", patientRecords);
      } else {
        return apiResponse.successResponseWithData(res, "success", []);
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * PatientRecord Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.patientRecordDetail = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.record_id)) {
    return apiResponse.notFoundResponse(
      res,
      "PatientRecord not exists with this id"
    );
  }
  try {
    PatientRecord.findOne({ _id: req.params.record_id }).then((patientRecord) => {
      if (patientRecord !== null) {
        return apiResponse.successResponseWithData(res, "success", patientRecord);
      } else {
        return apiResponse.notFoundResponse(
          res,
          "PatientRecord not exists with this id"
        );
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * PatientRecord store.
 *
 * @returns {Object}
 */
exports.patientRecordStore = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.patient_id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid Patient ID"
      );
    }
    let patient = await Patient.findById(req.params.patient_id) 
    if(!patient){
      return apiResponse.notFoundResponse(
        res,
        "Patient not exists with this id"
      );
    }
    var patientRecord = new PatientRecord({
      data_type: req.body.data_type,
      reading: {value: req.body.reading},
      date_time: req.body.date_time,
      patient: req.params.patient_id
    });
    console.log('---req.body---',req.body)
    //Save patientRecord.
    patientRecord.save(async function (err) {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }

      await Patient.findByIdAndUpdate(
        req.params.patient_id,
        {condition: req.body.patient_condition},
        {}
      );
      return apiResponse.successResponseWithData(
        res,
        "PatientRecord add Success.",
        patientRecord
      );
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * PatientRecord update.
 *
 * @returns {Object}
 */
exports.patientRecordUpdate = (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.record_id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid ID"
      );
    } else {
      PatientRecord.findById(req.params.record_id, function (err, foundPatientRecord) {
        if (foundPatientRecord === null) {
          return apiResponse.notFoundResponse(
            res,
            "PatientRecord not exists with this id"
          );
        } else {
          if (req.body.data_type) {
            foundPatientRecord.data_type = req.body.data_type;
          }
          if (req.body.reading) {
            foundPatientRecord.reading = {value: req.body.reading};
          }
          if (req.body.date_time) {
            foundPatientRecord.date_time = req.body.date_time;
          }
          
          //update patientRecord.
          PatientRecord.findByIdAndUpdate(
            req.params.record_id,
            foundPatientRecord,
            {},
            function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                return apiResponse.successResponseWithData(
                  res,
                  "PatientRecord update Success.",
                  foundPatientRecord
                );
              }
            }
          );
        }
      });
    }
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * PatientRecord Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.patientRecordDelete = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.record_id)) {
    return apiResponse.validationErrorWithData(
      res,
      "Invalid Error.",
      "Invalid ID"
    );
  }
  try {
    PatientRecord.findById(req.params.record_id, function (err, foundPatientRecord) {
      if (foundPatientRecord === null) {
        return apiResponse.notFoundResponse(
          res,
          "PatientRecord not exists with this id"
        );
      } else {
        //delete patientRecord.
        PatientRecord.findByIdAndRemove(req.params.record_id, function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          } else {
            return apiResponse.successResponse(res, "PatientRecord delete Success.");
          }
        });
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};
