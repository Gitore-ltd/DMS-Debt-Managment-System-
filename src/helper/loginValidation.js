import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email().required(),
  firstName: Joi.string().alphanum().min(2),
  lastName: Joi.string().alphanum().min(2),
  password: Joi.string().required(),
  phoneNumber: Joi.string().alphanum().min(2),
  address: Joi.string().alphanum().min(2),
});

export default userSchema;
