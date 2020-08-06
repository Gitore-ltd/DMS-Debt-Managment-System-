'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    title: DataTypes.STRING,
    quality: DataTypes.INTEGER,
    availableQuantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    productImage: DataTypes.STRING,
    unit: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};