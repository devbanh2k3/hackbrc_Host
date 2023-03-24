'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allaccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };




  allaccount.init({
    key: DataTypes.STRING,
    machinename: DataTypes.STRING,
    serialnumber: DataTypes.STRING,
    profilename: DataTypes.STRING,
    checkbm: DataTypes.BOOLEAN,
    birthday: DataTypes.STRING,
    uid: DataTypes.STRING,
    countaccount: DataTypes.STRING,
    Ideal: DataTypes.STRING,
    status: DataTypes.STRING,
    pickdate: DataTypes.STRING,
    country: DataTypes.STRING,
    ip: DataTypes.STRING,
    update: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'allaccount',
  });
  return allaccount;
};