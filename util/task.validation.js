const joi = require('joi');

exports.taskValidation = (data) => {
    const schema = joi.object({
        title: joi.string().required().messages({
            'string.empty': 'Title is required',
        }),
        status: joi.string().valid('completed', 'incomplete').messages({
            'any.only': 'Status should be either completed or incomplete'
        }),
    }).unknown(true);
    const {value, error} = schema.validate(data);

    return{
        value,
        error
    }
};