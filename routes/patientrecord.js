var express = require("express");
const { checkSchema } = require("express-validator");
const PatientRecordController = require("../controllers/PatientRecordController");
const { validate } = require("../middlewares/validator");
const { createPatientRecordSchema } = require("../request-schemas/PatientRecord");

var router = express.Router({mergeParams: true});

router.get("/", PatientRecordController.patientRecordList);
router.get("/:record_id", PatientRecordController.patientRecordDetail);
router.post("/", validate(checkSchema(createPatientRecordSchema)), PatientRecordController.patientRecordStore);
router.put("/:record_id", PatientRecordController.patientRecordUpdate);
router.delete("/:record_id", PatientRecordController.patientRecordDelete);

module.exports = router;