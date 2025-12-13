/**
 * Seed default users if they don't exist.
 * Uses registerUser so hashing and token logic stays consistent.
 */
import bcrypt from 'bcrypt';

/**
 * Seed default users if they don't exist.
 * Accepts the Users model to avoid importing models and causing circular imports.
 * @param {Object} Users - Sequelize Users model
 */
export default async function seedDefaultUsers(Users) {
  if (!Users) throw new Error('Users model is required to run seeding');

  try {
    const defaults = [
      { role: 'admin', email: 'admin@admin.com', password: 'password123', firstName: 'Admin', lastName: 'User' },
      { role: 'agent', email: 'agent@again.com', password: 'password123', firstName: 'Agent', lastName: 'User' },
      { role: 'customer', email: 'customer@customer.com', password: 'password123', firstName: 'Customer', lastName: 'User' },
    ];

    for (const u of defaults) {
      const [user, created] = await Users.findOrCreate({
        where: { email: u.email },
        defaults: {
          firstName: u.firstName,
          lastName: u.lastName,
          role: u.role,
          password: await bcrypt.hash(u.password, 10),
        },
      });

      if (created) {
        console.log(`Seeded user: ${u.email} (${u.role})`);
      } else {
        console.log(`User already exists: ${u.email}`);
      }
    }
  } catch (error) {
    console.error('Seeding default users failed:', error);
  }
}
