export function up(queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    firstName: 'Super',
    lastName: 'Admin',
    email: 'superAdmin@gmail.com',
    telephone: 782299719,
    password: '$2b$10$UGwknG6kIZ.7yKAZeIZ78ugYxtnr4rf5YIn2h0hyxpdmtTfszhOWW',
    nationalId: '1199480160777052',
    profileImage: '',
    role: 'superAdmin',
    dateOfBirth: new Date(),
    address: 'Kigali - Rwanda',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) { return queryInterface.bulkDelete('Users', null, {}); }