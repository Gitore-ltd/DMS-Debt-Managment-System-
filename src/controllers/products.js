import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
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

      const titleInLowerCase = title.toLowerCase();

      let { productImage } = req.body;
      productImage = imageLink ? imageLink.url : 'no image found';

      const product = productValidation.validate({
        productId: uuidv4(),
        email: req.user.email,
        title: titleInLowerCase,
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

      const existingProduct = await Product.findOne({ where: { title: titleInLowerCase } });

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
      console.log(error);
      return res.status(500).json({
        status: 500,
        Error: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
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

      if (!existingProduct) {
        return res.status(404).json({
          status: 404,
          error: 'Product does not exist, please check gain the title!',
        });
      }
      Product.update(product.value, { where: { title: req.body.title } })
        .then(() => Product.findOne({ where: { title: req.body.title } }))
        .then((product) => {
          res.status(200).json({
            status: 200,
            messsage: 'product successfuly updated!',
            product,
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        Error: error.message,
      });
    }
  }

  static async deleteProduct(req, res) {
    const existingProduct = await Product.findOne({
      where: { title: req.body.title },
    });
    if (!existingProduct) {
      return res.status(404).json({
        status: 404,
        error: 'Product does not exist, please check gain the title!',
      });
    }
    await Product.destroy({
      where: { title: req.body.title },
    });
    return res.status(200).json({
      status: 200,
      message: 'Product deleted successfully!',
    });
  }

  static async viewAllProducts(req, res) {
    const allProducts = await Product.findAll();
    if (allProducts.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No product found',
      });
    }
    return res.status(200).json({
      status: 200,
      allProducts,
    });
  }

  static async viewOneProduct(req, res) {
    if (req.body.title === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'To search, Please type the product title!',
      });
    }
    const oneProduct = await Product.findOne({
      where: { title: req.body.title },
    });
    if (oneProduct === null) {
      return res.status(404).json({
        status: 404,
        message: 'No product found',
      });
    }
    return res.status(200).json({
      status: 200,
      oneProduct,
    });
  }
}

export default products;
