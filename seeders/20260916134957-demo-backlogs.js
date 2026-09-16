'use strict';

const projectId = 'cccccccc-0000-0000-0000-000000000003';
const sprintId  = 'dddddddd-0000-0000-0000-000000000004';
const adminId   = 'aaaaaaaa-0000-0000-0000-000000000001';
const memberId  = 'bbbbbbbb-0000-0000-0000-000000000002';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('backlogs', [
      // Di sprint, status TODO
      {
        id: 'f1111111-0000-0000-0000-000000000010',
        project_id: projectId,
        sprint_id: sprintId,
        title: 'Setup struktur folder project',
        type: 'TASK',
        description: 'Membuat struktur folder MVC untuk backend',
        workflow: 'TODO',
        priority: 'HIGH',
        assigned_to: memberId,
        created_by: adminId,
        due_date: new Date('2026-09-10'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Di sprint, status IN_PROGRESS
      {
        id: 'f2222222-0000-0000-0000-000000000011',
        project_id: projectId,
        sprint_id: sprintId,
        title: 'Buat endpoint autentikasi',
        type: 'FEATURE',
        description: 'Register, Login, Logout dengan JWT',
        workflow: 'IN_PROGRESS',
        priority: 'HIGH',
        assigned_to: adminId,
        created_by: adminId,
        due_date: new Date('2026-09-12'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Di sprint, status IN_REVIEW
      {
        id: 'f3333333-0000-0000-0000-000000000012',
        project_id: projectId,
        sprint_id: sprintId,
        title: 'Desain ERD database',
        type: 'TASK',
        description: 'Membuat ERD untuk semua tabel di sistem',
        workflow: 'IN_REVIEW',
        priority: 'MEDIUM',
        assigned_to: memberId,
        created_by: adminId,
        due_date: new Date('2026-09-08'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Di sprint, status DONE
      {
        id: 'f4444444-0000-0000-0000-000000000013',
        project_id: projectId,
        sprint_id: sprintId,
        title: 'Setup koneksi database PostgreSQL',
        type: 'TASK',
        description: 'Konfigurasi Sequelize dengan PostgreSQL via Laragon',
        workflow: 'DONE',
        priority: 'HIGH',
        assigned_to: adminId,
        created_by: adminId,
        due_date: new Date('2026-09-05'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Backlog pool (belum masuk sprint)
      {
        id: 'f5555555-0000-0000-0000-000000000014',
        project_id: projectId,
        sprint_id: null,
        title: 'Buat fitur notifikasi email',
        type: 'STORY',
        description: 'User mendapat notifikasi email saat di-assign ke backlog',
        workflow: 'TODO',
        priority: 'LOW',
        assigned_to: null,
        created_by: adminId,
        due_date: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'f6666666-0000-0000-0000-000000000015',
        project_id: projectId,
        sprint_id: null,
        title: 'Fix bug login gagal di mobile',
        type: 'BUG',
        description: 'Login tidak bisa dilakukan di browser mobile Safari',
        workflow: 'TODO',
        priority: 'HIGH',
        assigned_to: memberId,
        created_by: memberId,
        due_date: new Date('2026-09-20'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('backlogs', null, {});
  },
};