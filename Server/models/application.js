'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.User, { foreignKey: 'userId' })
      Application.belongsTo(models.Job, { foreignKey: 'jobId' });
    }
  }
  Application.init({
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    cvUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};