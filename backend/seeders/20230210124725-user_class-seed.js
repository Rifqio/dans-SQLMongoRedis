/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("UserClasses", [
      {
        userId: 1,
        classId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        classId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        classId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        classId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        classId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserClasses", null, {});
  },
};
