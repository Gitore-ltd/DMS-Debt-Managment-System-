const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: 'email',
        as: 'ownerEmail',
      });

      User.hasMany(models.Request, {
        foreignKey: 'email',
        as: 'requestEmail',
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    nationalId: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    role: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
