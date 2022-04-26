const { DataTypes } = require('sequelize');

const Attributes = {
  id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },

  title: { allowNull: false, type: DataTypes.STRING },

  content: { allowNull: false, type: DataTypes.STRING },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', Attributes, {
    createdAt: 'published', tableName: 'BlogPosts', undescored: true, updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPost;
};