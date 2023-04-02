const Patient = require("../models/PatientModel");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * Patient List.
 *
 * @returns {Object}
 */
exports.patientList = async (req, res) => {
  try {
    console.log('request come')
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
    let searchObj = {}
    if(req.query.onlyCritical){
      searchObj.condition = 'critical'
    }
    let query = Patient.find(searchObj);
    query.sort({ createdAt: 1 });
    if (req.query.page) {
      query.skip((pageNumber - 1) * limit);
      query.limit(limit);
    }
    const count = await Patient.countDocuments(searchObj)
    let currentPage = pageNumber
    let totalCount = count
    let itemPerPage = limit
    let totalPage = Math.ceil(totalCount/itemPerPage)
    query.then((patients) => {
      if (patients.length > 0) {
        return apiResponse.successResponseWithData(res, "success", {data: patients , totalPage, currentPage, itemPerPage, totalCount, count:patients.length});
      } else {
        return apiResponse.notFoundResponse(res, "Data not found");
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * Patient Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.patientDetail = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return apiResponse.successResponseWithData(res, "success", {});
  }
  try {
    Patient.findOne({ _id: req.params.id }).then((patient) => {
      if (patient !== null) {
        return apiResponse.successResponseWithData(res, "success", patient);
      } else {
        return apiResponse.notFoundResponse(
          res,
          "Patient not exists with this id"
        );
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * Patient store.
 *
 * @returns {Object}
 */
exports.patientStore = async (req, res) => {
  try {
    console.log(req.body)
    const existPatient = await Patient.findOne({ email: req.body.email });
    if (existPatient) {
      return apiResponse.validationErrorWithData(
        res,
        "Patient with same email already exist"
      );
    }
    var patient = new Patient({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      age: req.body.age,
      address: req.body.address,
    });
    //Save patient.
    patient.save(function (err) {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }
      return apiResponse.successResponseWithData(
        res,
        "Patient add Success.",
        patient
      );
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

/**
 * Patient update.
 *
 * @returns {Object}
 */
exports.patientUpdate = (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid ID"
      );
    } else {
      Patient.findById(req.params.id, function (err, foundPatient) {
        if (foundPatient === null) {
          return apiResponse.notFoundResponse(
            res,
            "Patient not exists with this id"
          );
        } else {
          if (req.body.first_name) {
            foundPatient.first_name = req.body.first_name;
          }
          if (req.body.last_name) {
            foundPatient.last_name = req.body.last_name;
          }
          if (req.body.email) {
            foundPatient.email = req.body.email;
          }
          if (req.body.mobile) {
            foundPatient.mobile = req.body.mobile;
          }
          if (req.body.age) {
            foundPatient.age = req.body.age;
          }
          if (req.body.address) {
            foundPatient.address = req.body.address;
          }
          if (req.body.gender) {
            foundPatient.gender = req.body.gender;
          }
          //update patient.
          Patient.findByIdAndUpdate(
            req.params.id,
            foundPatient,
            {new: true},
            function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                return apiResponse.successResponseWithData(
                  res,
                  "Patient update Success.",
                  foundPatient
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
 * Patient Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.patientDelete = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return apiResponse.validationErrorWithData(
      res,
      "Invalid Error.",
      "Invalid ID"
    );
  }
  try {
    Patient.findById(req.params.id, function (err, foundPatient) {
      if (foundPatient === null) {
        return apiResponse.notFoundResponse(
          res,
          "Patient not exists with this id"
        );
      } else {
        //delete patient.
        Patient.findByIdAndRemove(req.params.id, function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          } else {
            return apiResponse.successResponse(res, "Patient delete Success.");
          }
        });
      }
    });
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};
