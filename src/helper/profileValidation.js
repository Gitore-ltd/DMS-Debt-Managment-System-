import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email(),
  firstName: Joi.string().alphanum().min(2),
  lastName: Joi.string().alphanum().min(2),
  // phone is required
  // and must be a string of the format XXX-XXX-XXX
  // where X is a digit (0-9)
  telephone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  address: Joi.string().alphanum().min(2),
  dateOfBirth: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nationalId: Joi.number(),
  // .error(() => ({
  //   message: 'Invalid national Id',
  // })),
});

export default userSchema;
