/* eslint no-magic-numbers: 0 */
const Joi = require('joi');

function validateQuery(user) {
    const schema = {
        start : Joi.number()
            .integer()
            .min(0)
            .max(255)
            .required(),
        rows  : Joi.number()
            .integer()
            .min(1)
            .max(255)
            .required()
    };

    return Joi.validate(user, schema);
}

function validateUser(user) {
    const schema = {
        givenName : Joi.string()
            .min(2)
            .max(255)
            .required(),
        familyName : Joi.string()
            .min(2)
            .max(255)
            .required(),
        email : Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password : Joi.string()
            .min(5)
            .max(1024)
            .required()
    };

    return Joi.validate(user, schema);
}

function validateAuth(req) {
    const schema = {
        email : Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password : Joi.string()
            .min(5)
            .max(1024)
            .required()
    };

    return Joi.validate(req, schema);
}


module.exports.validateQuery = validateQuery;
module.exports.validateUser = validateUser;
module.exports.validateAuth = validateAuth;
