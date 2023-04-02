exports.createPatientRecordSchema = {
    data_type: {
        notEmpty: {
            errorMessage: "Data type field cannot be empty",
        },
        isIn: {
            options: [['blood_pressure', 'respiratory_rate', 'blood_oxygen_level', 'heartbeat_rate']],
            errorMessage: "Invalid data type"
        },
        
    },
    reading: {
        notEmpty: {
            errorMessage: "Reading field cannot be empty"
        },
    },
    date_time: {
        notEmpty: {
            errorMessage: "Date/time field cannot be empty"
        },
        isISO8601: {
            errorMessage: "Invalid Date/time"
        },
    }
}
