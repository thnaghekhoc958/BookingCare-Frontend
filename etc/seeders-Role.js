module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Role', [
        {
          role_id : '1',
          keyRole : 'R1',
          name: "ADMIN", 
        },
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Role', null, {});
    },
  };