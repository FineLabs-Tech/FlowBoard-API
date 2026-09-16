'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const adminId = 'aaaaaaaa-0000-0000-0000-000000000001';
const memberId = 'bbbbbbbb-0000-0000-0000-000000000002';

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('12345678', 10);
    await queryInterface.bulkInsert('users', [
      {
        id: adminId,
        name: 'Budi Admin',
        email: 'admin@mail.com',
        password: hashedPassword,
        role: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: memberId,
        name: 'Siti Member',
        email: 'member@mail.com',
        password: hashedPassword,
        role: 'MEMBER',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};