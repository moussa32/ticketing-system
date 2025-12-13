import { registerUser } from '@/lib/services/authService';
import Users from './models/Users';

/**
 * Seed default users if they don't exist.
 * Uses registerUser so hashing and token logic stays consistent.
 */
export default async function seedDefaultUsers() {
  try {
    const defaults = [
      { role: 'admin', email: 'admin@admin.com', password: 'password123', firstName: 'Admin', lastName: 'User' },
      { role: 'agent', email: 'agent@again.com', password: 'password123', firstName: 'Agent', lastName: 'User' },
      { role: 'customer', email: 'customer@customer.com', password: 'password123', firstName: 'Customer', lastName: 'User' },
    ];

    for (const u of defaults) {
      // Check if exists using model
      const exists = await Users.findOne({ where: { email: u.email } });
      if (!exists) {
        // call registerUser which will hash password and create user
        try {
          await registerUser(u.role, {
            email: u.email,
            password: u.password,
            firstName: u.firstName,
            lastName: u.lastName,
          });
          console.log(`Seeded user: ${u.email} (${u.role})`);
        } catch (err) {
          console.error(`Failed to create user ${u.email}:`, err.message || err);
        }
      } else {
        console.log(`User already exists: ${u.email}`);
      }
    }
  } catch (error) {
    console.error('Seeding default users failed:', error);
  }
}
