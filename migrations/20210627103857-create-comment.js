'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model :'Posts',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model :'Users',
          key: 'id'
        },
        onDelete : 'CASCADE'
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
        onDelete : 'CASCADE'
      },
      postReply: {
        allowNull: false,
        type: Sequelize.TEXT,
        onDelete : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};