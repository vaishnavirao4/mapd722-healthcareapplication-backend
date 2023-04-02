const { validationResult } = require("express-validator");

exports.validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        
        var resData = {
            status: 0,
            message: "Bad Request",
            data: errors.array({onlyFirstError: true})
        };
        return res.status(400).json(resData);
    };
};