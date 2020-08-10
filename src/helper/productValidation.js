import Joi from '@hapi/joi';

const productSchema = Joi.object().keys({
  email: Joi.string(),
  productId: Joi.string(),
  title: Joi.string().required(),
  quality: Joi.number().required(),
  availableQuantity: Joi.number().required(),
  price: Joi.number().required(),
  unit: Joi.string().required(),
  description: Joi.string().required(),
  productImage: Joi.string().required(),
});

export default productSchema;
