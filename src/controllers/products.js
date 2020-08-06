import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { Product } from '../database/models';
import productValidation from '../helper/productValidation';

dotenv.config();

class products {
  static async addProduct(req, res) {
    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      let imageLink = null;
      if (req.files) {
        const file = req.files.productImage;
        imageLink = await cloudinary.uploader.upload(file.tempFilePath);
      }

      const {
        title,
        quality,
        availableQuantity,
        price,
        unit,
        description,
      } = req.body;

      let { productImage } = req.body;
      productImage = imageLink ? imageLink.url : 'no image found';

      const product = productValidation.validate({
        title,
        quality,
        unit,
        availableQuantity,
        price,
        description,
        productImage,
      });

      if (product.error) {
        return res
          .status(400)
          .json({ status: 400, error: product.error.details[0].message });
      }

      const existingProduct = await Product.findOne({ where: { title } });

      if (existingProduct) {
        return res.status(409).json({
          status: 409,
          error: 'Product already exist, please update!',
        });
      }

      const newProduct = await Product.create(product.value);

      return res.status(201).json({
        status: 201,
        message: 'new Product successfuly added',
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        Error: error.message,
      });
    }
  }
}

export default products;
