import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email(),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  telephone: Joi.string().min(10).max(12).message('invalid phone Number'),
  address: Joi.string().alphanum().min(2),
  nationalId: Joi.string().min(16).max(16).message('invalid national Id'),
  profileImage: Joi.string(),
});

export default userSchema;
