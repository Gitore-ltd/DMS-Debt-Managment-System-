const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'email',
        as: 'ownerEmail',
        onDelete: 'CASCADE',
      });
      Product.hasMany(models.Request, {
        foreignKey: 'productId',
        as: 'requestedProductId',
      });
    }
  }
  Product.init({
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    quality: DataTypes.INTEGER,
    availableQuantity: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    price: DataTypes.INTEGER,
    productImage: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
