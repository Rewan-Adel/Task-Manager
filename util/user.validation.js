const joi = require('joi');

exports.signupValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(6).required().messages({
            'string.empty': 'Username is required',
            'string.min': 'Username should have a minimum length of 6'
        }),
        email: joi.string().required().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is invalid',
        }),
        password: joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password should have a minimum length of 6'
        })
    });
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};

exports.loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().required().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email is invalid',
        }),
        password: joi.string().required().messages({
            'string.empty': 'Password is required',
        })
    });
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
}