'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Cards', [
      {
        id: 1,
        card: 'https://images.unsplash.com/photo-1617796993472-7c1a483d3e39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGludml0YXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        card: 'https://images.unsplash.com/photo-1616879577377-ca82803b8c8c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmclMjBpbnZpdGF0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        card: 'https://media.istockphoto.com/photos/valentine-day-background-picture-id1132599079?b=1&k=20&m=1132599079&s=170667a&w=0&h=rwLsj6uHSP6Fil_FeuhewslDoaptoT6eSgUJ4TrnMhc=',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        card: 'https://images.unsplash.com/photo-1612619733782-0aab4b31d10f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMGludml0YXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
