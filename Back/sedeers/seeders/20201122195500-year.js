"use strict";

//YEAR
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("years", [
      {
        name: 1994,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 1999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2001,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2002,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2004,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2008,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2010,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2012,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2013,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2014,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2015,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2016,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2017,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2018,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 2019,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("years", null, {});
  },
};
