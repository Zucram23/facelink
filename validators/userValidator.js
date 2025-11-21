const joi = require('joi');
const objectId = /^[0-9a-fA-F]{24}$/;
const {required} = require('joi');

const schema = joi.object({

    name: joi.string().trim().min(2).required().messages({


        'string.empty': 'Name is required',
        'string.min': 'Name needs to be at least 2 characters long',
        'string.base': 'Name should be text',
        'any.required': 'Name field is required',

    }),

    email: joi.string().required().email({ tlds: { allow: false } }).messages({
        'string.empty': 'Email is cannot be empty',
        'string.email': 'Email is not valid',
        'any.required': 'Email is required',

    }),

    posts: joi.array().items(
        joi.string().pattern(objectId)
    )
        .default([]),
})

exports.validateUser = (req, res, next) => {
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({errors: error.details.map(d => d.message) });
    } next();
};