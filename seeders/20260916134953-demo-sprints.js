'use strict';

const sprintId = 'dddddddd-0000-0000-0000-000000000004';
const projectId = 'cccccccc-0000-0000-0000-000000000003';
const adminId = 'aaaaaaaa-0000-0000-0000-000000000001';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sprints', [
      {
        id: sprintId,
        project_id: projectId,
        name: 'Sprint 1',
        description: 'Sprint pertama FlowBoard',
        status: 'ACTIVE',
        start_date: new Date('2026-09-01'),
        due_date: new Date('2026-09-14'),
        created_by: adminId,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'eeeeeeee-0000-0000-0000-000000000005',
        project_id: projectId,
        name: 'Sprint 2',
        description: 'Sprint kedua FlowBoard',
        status: 'PLANNED',
        start_date: null,
        due_date: new Date('2026-09-28'),
        created_by: adminId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sprints', null, {});
  },
};