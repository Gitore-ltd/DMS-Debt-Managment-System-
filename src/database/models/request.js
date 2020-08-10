const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'requestedProductId',
        onDelete: 'CASCADE',
      });
      Request.belongsTo(models.User, {
        foreignKey: 'email',
        as: 'requestEmail',
        onDelete: 'CASCADE',
      });
    }
  }
  Request.init(
    {
      requestId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      productId: DataTypes.STRING,
      email: DataTypes.STRING,
      productTitle: DataTypes.STRING,
      quality: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      requestedDate: DataTypes.DATE,
      tobePayed: DataTypes.DATE,
      requestStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Request',
    },
  );
  return Request;
};
