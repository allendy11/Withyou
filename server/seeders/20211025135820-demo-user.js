'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'Best Kim',
        email: 'best@gmail.com',
        password:
          '$2b$12$N4tO0fHVU7EPObmNDFBAnuQrWDIuLgYrrP2o7V1uTptPi1qDhAwlm',
        mobile: '010-1234-5678',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'Tiger Park',
        email: 'tiger@hotmail.com',
        password:
          '$2b$12$R6IDfgK/PosSn7L/c9MQaeUORX0bRLMLg7b5Kt7mG/j9gOINjzIcS',
        mobile: '010-1234-5678',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
