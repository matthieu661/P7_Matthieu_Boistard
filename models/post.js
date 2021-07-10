'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // define association here
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          onDelete : 'CASCADE'
        }
      })
        
      }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING, 
    attachement: { type : DataTypes.STRING, allowNull : true },
    likes: {type : DataTypes.INTEGER, defaultValue: 0 }, 
    dislikes : {type : DataTypes.INTEGER, defaultValue: 0 },
    userName : {
      type: DataTypes.STRING,
      references : {
        model : 'User',
        key : 'username'
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};