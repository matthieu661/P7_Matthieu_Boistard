'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // to tomany avant to sinon bug...pk?
      models.User.belongToMany(models.Post, {
        through: models.Like,
        foreignKey : 'userId',
        otherKey: 'postId',
      });
      models.User.belongToMany(models.User, {
        through : models.Like,
        foreignKey : 'userId',
        otherKey: 'userId',
      });
      models.User.belongTo(models.User, {
        foreignKey : 'userId',
        as: 'userId',
      });
      models.User.belongTo(models.Post, {
        foreignKey : 'postId',
        as: 'postId',
      });

    }
  };
  Like.init({
    postId: DataTypes.INTEGER,
    references : {
      model : 'Post',
      key : 'id'
    },
    userId: DataTypes.INTEGER,
    references : {
      model : 'User',
      key : 'id'
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};