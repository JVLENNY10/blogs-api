const postCategory = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    tableName: 'PostsCategories', timestamps: false, undescored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories', foreignKey: 'postId', otherKey: 'categoryId', through: PostCategory,
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts', foreignKey: 'categoryId', otherKey: 'postId', through: PostCategory,
    });
  };

  return PostCategory;
};

module.exports = postCategory;
