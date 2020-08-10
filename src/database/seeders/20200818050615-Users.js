export function up(queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    firstName: 'Maxime',
    lastName: 'Kagorora',
    email: 'kagororamaxime@gmail.com',
    telephone: 782299719,
    password: '$2b$10$UGwknG6kIZ.7yKAZeIZ78ugYxtnr4rf5YIn2h0hyxpdmtTfszhOWW',
    role: 'seller',
    nationalId: '1199480160777052',
    profileImage: '',
    role: '',
    dateOfBirth: new Date(),
    address: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) { return queryInterface.bulkDelete('Users', null, {}); }