module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    tableName: 'PostsCategories', timestamps: false, undescored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'posts', foreignKey: 'postId', otherKey: 'categoryId', through: 'PostCategory',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'categories', foreignKey: 'categoryId', otherKey: 'postId', through: 'PostCategory',
    });
  };

  return PostCategory;
};
