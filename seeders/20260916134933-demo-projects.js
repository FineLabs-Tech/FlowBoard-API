'use strict';

const projectId = 'cccccccc-0000-0000-0000-000000000003';
const adminId = 'aaaaaaaa-0000-0000-0000-000000000001';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('projects', [
      {
        id: projectId,
        name: 'FlowBoard',
        description: 'Aplikasi project management berbasis Jira',
        created_by: adminId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};