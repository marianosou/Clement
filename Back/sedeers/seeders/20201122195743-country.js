"use strict";

//COUNTRY
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("countries", [
      {
        name: "Australia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "France",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Italy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Spain",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "USA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("countries", null, {});
  },
};
