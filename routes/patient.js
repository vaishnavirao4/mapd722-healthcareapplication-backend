var express = require("express");
const { checkSchema } = require("express-validator");
const PatientController = require("../controllers/PatientController");
const { validate } = require("../middlewares/validator");
const { createPatientSchema, updatePatientSchema, patientListSchema } = require("../request-schemas/Patient");

var router = express.Router();

router.get("/", validate(checkSchema(patientListSchema)), PatientController.patientList);
router.get("/:id", PatientController.patientDetail);
router.post("/", validate(checkSchema(createPatientSchema)), PatientController.patientStore);
router.put("/:id", PatientController.patientUpdate);
router.delete("/:id", PatientController.patientDelete);

module.exports = router;