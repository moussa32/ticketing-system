import bcrypt from "bcrypt";
import sequelize from "./connection.js";

/**
 * Seed database using the provided SQL script.
 * Hashes passwords for demo users.
 * Uses NOT EXISTS to avoid duplicates (no unique constraints required).
 */
export default async function seedDatabase() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const sql = `
BEGIN;

-- ROLES (skip if already exists)
INSERT INTO roles (role_name)
SELECT 'Admin' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'Admin');
INSERT INTO roles (role_name)
SELECT 'Agent' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'Agent');
INSERT INTO roles (role_name)
SELECT 'Customer' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'Customer');

-- DEPARTMENTS (skip if already exists)
INSERT INTO department (dept_name)
SELECT 'IT Support' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_name = 'IT Support');
INSERT INTO department (dept_name)
SELECT 'Customer Service' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_name = 'Customer Service');
INSERT INTO department (dept_name)
SELECT 'Billing' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_name = 'Billing');

-- URGENCY (skip if already exists)
INSERT INTO urgency (urgency_name, duration)
SELECT 'Critical', 1 WHERE NOT EXISTS (SELECT 1 FROM urgency WHERE urgency_name = 'Critical');
INSERT INTO urgency (urgency_name, duration)
SELECT 'High', 4 WHERE NOT EXISTS (SELECT 1 FROM urgency WHERE urgency_name = 'High');
INSERT INTO urgency (urgency_name, duration)
SELECT 'Medium', 12 WHERE NOT EXISTS (SELECT 1 FROM urgency WHERE urgency_name = 'Medium');
INSERT INTO urgency (urgency_name, duration)
SELECT 'Low', 24 WHERE NOT EXISTS (SELECT 1 FROM urgency WHERE urgency_name = 'Low');

-- CATEGORIES (skip if already exists)
INSERT INTO category (category_name, urgency_id)
SELECT 'System Issue', (SELECT urgency_id FROM urgency WHERE urgency_name = 'Critical')
WHERE NOT EXISTS (SELECT 1 FROM category WHERE category_name = 'System Issue');
INSERT INTO category (category_name, urgency_id)
SELECT 'Payment Issue', (SELECT urgency_id FROM urgency WHERE urgency_name = 'High')
WHERE NOT EXISTS (SELECT 1 FROM category WHERE category_name = 'Payment Issue');
INSERT INTO category (category_name, urgency_id)
SELECT 'General Inquiry', (SELECT urgency_id FROM urgency WHERE urgency_name = 'Low')
WHERE NOT EXISTS (SELECT 1 FROM category WHERE category_name = 'General Inquiry');

-- USERS (skip if already exists)
INSERT INTO users (first_name, last_name, email, password, role_id)
SELECT 'System', 'Admin', 'admin@admin.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Admin')
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@admin.com');
INSERT INTO users (first_name, last_name, email, password, role_id)
SELECT 'Support', 'Agent', 'agent@agent.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Agent')
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'agent@agent.com');
INSERT INTO users (first_name, last_name, email, password, role_id)
SELECT 'Demo', 'Customer', 'customer@customer.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Customer')
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'customer@customer.com');

-- USER DEPARTMENT MAPPING (skip if already exists)
INSERT INTO user_department (user_id, dept_id)
SELECT u.user_id, d.dept_id FROM users u, department d 
WHERE u.email = 'admin@admin.com' AND d.dept_name = 'IT Support'
AND NOT EXISTS (SELECT 1 FROM user_department ud WHERE ud.user_id = u.user_id AND ud.dept_id = d.dept_id);

INSERT INTO user_department (user_id, dept_id)
SELECT u.user_id, d.dept_id FROM users u, department d 
WHERE u.email = 'agent@agent.com' AND d.dept_name = 'Customer Service'
AND NOT EXISTS (SELECT 1 FROM user_department ud WHERE ud.user_id = u.user_id AND ud.dept_id = d.dept_id);

INSERT INTO user_department (user_id, dept_id)
SELECT u.user_id, d.dept_id FROM users u, department d 
WHERE u.email = 'customer@customer.com' AND d.dept_name = 'Billing'
AND NOT EXISTS (SELECT 1 FROM user_department ud WHERE ud.user_id = u.user_id AND ud.dept_id = d.dept_id);

-- DEMO TICKET (skip if already exists)
INSERT INTO ticket (subject, description, status, category_id, urgency_id, dept_id, user_id)
SELECT 'Login issue', 'Unable to login using my credentials', 'Open',
 (SELECT category_id FROM category WHERE category_name = 'System Issue'),
 (SELECT urgency_id FROM urgency WHERE urgency_name = 'High'),
 (SELECT dept_id FROM department WHERE dept_name = 'Customer Service'),
 (SELECT user_id FROM users WHERE email = 'customer@customer.com')
WHERE NOT EXISTS (SELECT 1 FROM ticket WHERE subject = 'Login issue');

-- AGENT REPLY (skip if already exists)
INSERT INTO reply_tickets (reply_message, ticket_id, user_id)
SELECT 'We are investigating the issue. Please standby.',
 (SELECT ticket_id FROM ticket WHERE subject = 'Login issue' ORDER BY ticket_id DESC LIMIT 1),
 (SELECT user_id FROM users WHERE email = 'agent@agent.com')
WHERE NOT EXISTS (SELECT 1 FROM reply_tickets WHERE reply_message = 'We are investigating the issue. Please standby.');

COMMIT;
    `;

    await sequelize.query(sql);
    console.log("Database seeded successfully with SQL script.");
  } catch (error) {
    console.error("Seeding database failed:", error);
  }
}
