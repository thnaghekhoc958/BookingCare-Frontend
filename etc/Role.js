'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    // id:{
    // type: DataTypes.INTEGER,
    // allowNull: false,
    // autoIncrement: true,
    // primaryKey: true,
    // },
    role_id: DataTypes.INTEGER,
    keyRole : DataTypes.STRING(2),
    name: DataTypes.STRING(150),
  }, 
  {
    sequelize,
    modelName: 'Role',
    freezeTableName: true,
    timestamps: true, 
  });
  return Role;
};