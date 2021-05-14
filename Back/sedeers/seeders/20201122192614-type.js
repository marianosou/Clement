"use strict";

//TYPE
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("types", [
      {
        name: "Red",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rosé",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'White',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("types", null, {});
  },
};
