import bcrypt from "bcrypt";
import sequelize from "./connection.js";

/**
 * Seed database using the provided SQL script.
 * Hashes passwords for demo users.
 */
export default async function seedDatabase() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const sql = `
BEGIN;

-- ROLES
INSERT INTO roles (role_name) VALUES
('Admin'),
('Agent'),
('Customer')
ON CONFLICT (role_name) DO NOTHING;

-- DEPARTMENTS
INSERT INTO department (dept_name) VALUES
('IT Support'),
('Customer Service'),
('Billing')
ON CONFLICT (dept_name) DO NOTHING;

-- URGENCY
INSERT INTO urgency (urgency_name, duration) VALUES
('Critical', 1),
('High', 4),
('Medium', 12),
('Low', 24)
ON CONFLICT (urgency_name) DO NOTHING;

-- CATEGORIES
INSERT INTO category (category_name, urgency_id) VALUES
('System Issue', (SELECT urgency_id FROM urgency WHERE urgency_name = 'Critical')),
('Payment Issue', (SELECT urgency_id FROM urgency WHERE urgency_name = 'High')),
('General Inquiry', (SELECT urgency_id FROM urgency WHERE urgency_name = 'Low'))
ON CONFLICT (category_name) DO NOTHING;

-- USERS
INSERT INTO users (first_name, last_name, email, password, role_id)
VALUES
('System', 'Admin', 'admin@admin.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Admin')),
('Support', 'Agent', 'agent@agent.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Agent')),
('Demo', 'Customer', 'customer@customer.com', '${hashedPassword}', (SELECT role_id FROM roles WHERE role_name = 'Customer'))
ON CONFLICT (email) DO NOTHING;

-- USER DEPARTMENT MAPPING
INSERT INTO user_department (user_id, dept_id)
VALUES
((SELECT user_id FROM users WHERE email = 'admin@admin.com'), (SELECT dept_id FROM department WHERE dept_name = 'IT Support')),
((SELECT user_id FROM users WHERE email = 'agent@agent.com'), (SELECT dept_id FROM department WHERE dept_name = 'Customer Service')),
((SELECT user_id FROM users WHERE email = 'customer@customer.com'), (SELECT dept_id FROM department WHERE dept_name = 'Billing'))
ON CONFLICT DO NOTHING;

-- DEMO TICKET
INSERT INTO ticket (subject, description, status, category_id, urgency_id, dept_id, user_id)
VALUES
('Login issue', 'Unable to login using my credentials', 'Open', 
 (SELECT category_id FROM category WHERE category_name = 'System Issue'),
 (SELECT urgency_id FROM urgency WHERE urgency_name = 'High'),
 (SELECT dept_id FROM department WHERE dept_name = 'Customer Service'),
 (SELECT user_id FROM users WHERE email = 'customer@customer.com'))
ON CONFLICT DO NOTHING;

-- AGENT REPLY
INSERT INTO reply_tickets (reply_message, ticket_id, user_id)
VALUES
('We are investigating the issue. Please standby.', 
 (SELECT ticket_id FROM ticket WHERE subject = 'Login issue' ORDER BY ticket_id DESC LIMIT 1),
 (SELECT user_id FROM users WHERE email = 'agent@agent.com'))
ON CONFLICT DO NOTHING;

COMMIT;
    `;

    await sequelize.query(sql);
    console.log("Database seeded successfully with SQL script.");
  } catch (error) {
    console.error("Seeding database failed:", error);
  }
}
