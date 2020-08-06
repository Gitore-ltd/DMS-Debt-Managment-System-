import Joi from '@hapi/joi';

const productSchema = Joi.object().keys({
  title: Joi.string(),
  quality: Joi.number(),
  availableQuantity: Joi.number(),
  price: Joi.number(),
  unit: Joi.string(),
  description: Joi.string(),
  productImage: Joi.string(),
});

export default productSchema;
