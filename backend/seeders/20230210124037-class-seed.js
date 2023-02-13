/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Classes", [
      { name: "XII A", createdAt: new Date(), updatedAt: new Date() },
      { name: "XII B", createdAt: new Date(), updatedAt: new Date() },
      { name: "XII C", createdAt: new Date(), updatedAt: new Date() },
      { name: "XII D", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
