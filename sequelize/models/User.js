const { DataTypes } = require('sequelize');

const Attributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },

  displayName: { allowNull: false, type: DataTypes.STRING },

  email: { allowNull: false, type: DataTypes.STRING },

  password: { allowNull: false, type: DataTypes.INTEGER },

  image: { allowNull: false, type: DataTypes.STRING },
};

module.exports = (sequelize) => {
  const User = sequelize.define('User', Attributes, {
    tableName: 'Users', timestamps: false, undescored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { as: 'posts', foreignKey: 'userId' });
  };

  return User;
};
