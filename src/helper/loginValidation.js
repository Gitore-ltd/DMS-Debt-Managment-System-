import Joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
}

passwordComplexity(complexityOptions).validate();

const userSchema = Joi.object().keys({
  id: Joi.number(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default userSchema;
