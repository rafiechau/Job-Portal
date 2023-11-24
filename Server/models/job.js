'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, {
        foreignKey: 'EmployerID',
        as: 'recruiter'
      });
      Job.hasMany(models.Application, { 
        foreignKey: 'jobId',
        as: 'applications' // Alias opsional untuk digunakan dalam query
      });
    }
  }
  Job.init({
    EmployerID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    Company: DataTypes.STRING,
    Judul: DataTypes.STRING,
    Deskripsi: DataTypes.TEXT,
    Lokasi: DataTypes.STRING,
    TipePekerjaan: DataTypes.STRING,
    Gaji: DataTypes.STRING,
    Kategori: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};