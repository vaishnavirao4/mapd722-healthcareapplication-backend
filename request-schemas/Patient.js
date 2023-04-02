exports.createPatientSchema = {
    first_name: {
        isLength: {
            options: { min: 1, max: 25},
            errorMessage: "Max 25 character allowed"
        },
        notEmpty: true,
        errorMessage: "First Name field cannot be empty"
    },
    last_name: {
        isLength: {
            options: { min: 1, max: 25},
            errorMessage: "Max 25 character allowed"
        },
        notEmpty: true,
        errorMessage: "Last Name field cannot be empty"
    },
    email: {
        isEmail:{
            errorMessage: "Invalid Email field"
        },
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: "Email field cannot be empty"
    },
    gender: {
        isIn: {
            options: [["male", "female", "other"]],
            errorMessage: "Invalid gender"
        },
        notEmpty: true,
        errorMessage: "Gender field cannot be empty"
    },
    mobile: {
        isMobilePhone:{
            errorMessage: "Invalid mobile"
        },
        notEmpty: true,
        errorMessage: "Mobile field cannot be empty"
    },
    age: {
        isInt:{
            errorMessage: "Invalid Age"
        },
        notEmpty: true,
        errorMessage: "Age field cannot be empty"
    },
    address: {
        notEmpty: true,
        errorMessage: "Address field cannot be empty"
    },
}

exports.patientListSchema = {
    page:{
        optional: { options: { nullable: true } },
        isInt:{
            options:{ min: 1},
            errorMessage: "Invalid Page value"
        },
    },
    limit:{
        optional: { options: { nullable: true } },
        isInt:{
            options:{ min: 1},
            errorMessage: "Invalid limit value"
        },
    },
    onlyCritical:{
        optional: { options: { nullable: true } },
        isBoolean:{
            errorMessage: "Invalid parameter"
        },
        toBoolean: true
    }
    
}
