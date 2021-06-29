'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId',
      });
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'userId',
      });
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'userC',
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'postC',
      });
    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
    },
    userName : {
      type: DataTypes.STRING,
      references : {
        model : 'User',
        key : 'username'
      }
    },
    postReply: {

      type: DataTypes.STRING,
      AllowNull: false
    },
  },
    {
      sequelize,
      modelName: 'Comment',
    });
  return Comment;
};