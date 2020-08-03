import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default userSchema;
