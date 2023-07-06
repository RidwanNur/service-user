'use strict';
const bcrypt= require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
        name: 'Ridwan',
        profession: 'Web Developer',
        role: 'admin',
        email: 'ridwan@gmail.com',
        password : await bcrypt.hash('ridwan123', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nur',
        profession: 'Mobile Developer',
        role: 'student',
        email: 'nur@gmail.com',
        password : await bcrypt.hash('nur123', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('users', null, {});

  }
};
