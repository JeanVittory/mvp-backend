import Joi from 'joi';

export const authenticationSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required().max(16),
});
