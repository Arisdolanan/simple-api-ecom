'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders.init({
    user_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    shipping_address: DataTypes.STRING,
    order_address: DataTypes.STRING,
    order_email: DataTypes.STRING,
    order_date: DataTypes.STRING,
    order_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};