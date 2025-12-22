import 'dotenv/config';
import sequelize from './lib/database/connection.js';
import Users from './lib/database/models/Users.js';
import bcrypt from 'bcrypt';

async function testLogin() {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✓ Database connected successfully\n');

    // Try to find all users
    console.log('Fetching all users...');
    const users = await Users.findAll({
      attributes: ['id', 'email', 'firstName', 'lastName', 'role', 'password']
    });
    
    console.log(`Found ${users.length} users:\n`);
    
    for (const user of users) {
      console.log(`User: ${user.email}`);
      console.log(`  - ID: ${user.id}`);
      console.log(`  - Name: ${user.firstName} ${user.lastName}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Has Password: ${user.password ? 'Yes' : 'No'}`);
      console.log(`  - Password Hash: ${user.password ? user.password.substring(0, 20) + '...' : 'NULL'}`);
      console.log('');
    }

    // Test password validation for a specific user
    if (users.length > 0) {
      const testUser = users[0];
      console.log(`\nTesting password validation for: ${testUser.email}`);
      
      // Try with a common test password
      const testPasswords = ['admin', 'password', '123456', 'admin123'];
      
      for (const pwd of testPasswords) {
        try {
          const isValid = await bcrypt.compare(pwd, testUser.password || '');
          console.log(`  Password "${pwd}": ${isValid ? '✓ MATCH' : '✗ No match'}`);
        } catch (err) {
          console.log(`  Password "${pwd}": Error - ${err.message}`);
        }
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

testLogin();
