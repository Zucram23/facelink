const joi = require('joi');
const objectId = /^[0-9a-fA-F]{24}$/;
const {required} = require('joi');

const schema = joi.object({
    content: joi.string().required().trim().messages({
        'string.empty': 'Content field cannot be empty',
        'any.required': 'Content field is required',
        'string.base': 'Content field has to be text'
    }),

    likes: joi.number().integer().default(0).min(0),

    user_id: joi.string().pattern(objectId).required().messages({
        'any.required': 'user_id field is required',
        'string.pattern.base': 'invalid user_id'
    }),

    timestamp: joi.date().default(Date.now)


});

exports.validatePost = (req, res, next) => {
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({errors: error.details.map(d => d.message) });
    } next();
};