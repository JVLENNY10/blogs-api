const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

const category = (sequelize) => {
  const Category = sequelize.define('Category', Attributes, {
    tableName: 'Categories', timestamps: false, undescored: true,
  });

  return Category;
};

module.exports = category;
