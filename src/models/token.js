'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tokendb extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };




    tokendb.init({
        token: DataTypes.TEXT,
        csrf: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'tokendb',
    });
    return tokendb;
};