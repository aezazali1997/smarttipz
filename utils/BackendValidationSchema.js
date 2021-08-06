import Joi from "joi";

export const validateSignup = (body) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        accountType: Joi.string().required(),
        businessName: Joi.any().when('accountType', {
            is: 'Business',
            then: Joi.string().required(),
            otherwise: Joi.string().allow(null).allow('').optional()
        }),
        website: Joi.any().when('accountType', {
            is: 'Business',
            then: Joi.string().required().uri(),
            otherwise: Joi.string().allow(null).allow('').optional().uri()
        })
    });
    return schema.validate(body);
};

export const validateSignin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

export const validateForgot = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email()
    });
    return schema.validate(data);
};

export const validateResend = (data) => {
    const schema = Joi.object({
        username: Joi.string().required()
    });
    return schema.validate(data);
};

export const validateAuthenticate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        varificationCode: Joi.string().required().length(6)
    });
    return schema.validate(data);
};