import bcrypt from "bcrypt";
import sequelize from "./connection.js";

export default async function seedDatabase() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Start transaction
    const t = await sequelize.transaction();

    try {
      // Clear tables safely
      await sequelize.query(`
        TRUNCATE TABLE user_department RESTART IDENTITY CASCADE;
        TRUNCATE TABLE users RESTART IDENTITY CASCADE;
        TRUNCATE TABLE category RESTART IDENTITY CASCADE;
        TRUNCATE TABLE urgency RESTART IDENTITY CASCADE;
        TRUNCATE TABLE department RESTART IDENTITY CASCADE;
        TRUNCATE TABLE roles RESTART IDENTITY CASCADE;
      `, { transaction: t });

      // Insert roles
      const rolesRes = await sequelize.query(
        `INSERT INTO roles (role_name) VALUES ('Admin'), ('Agent'), ('Customer') RETURNING *;`,
        { transaction: t }
      );

      const rolesMap = {};
      rolesRes[0].forEach(role => {
        rolesMap[role.role_name] = role.role_id;
      });

      // Insert departments
      const deptsRes = await sequelize.query(
        `INSERT INTO department (dept_name) VALUES ('IT Support'), ('Customer Service'), ('Billing') RETURNING *;`,
        { transaction: t }
      );

      const deptMap = {};
      deptsRes[0].forEach(dept => {
        deptMap[dept.dept_name] = dept.dept_id;
      });

      // Insert urgency
      const urgencyRes = await sequelize.query(
        `INSERT INTO urgency (urgency_name, duration) VALUES
        ('Critical', 1), ('High', 4), ('Medium', 12), ('Low', 24) RETURNING *;`,
        { transaction: t }
      );

      const urgencyMap = {};
      urgencyRes[0].forEach(u => {
        urgencyMap[u.urgency_name] = u.urgency_id;
      });

      // Insert categories
      await sequelize.query(
        `INSERT INTO category (category_name, urgency_id) VALUES
        ('System Issue', ${urgencyMap['Critical']}),
        ('Payment Issue', ${urgencyMap['High']}),
        ('General Inquiry', ${urgencyMap['Low']});`,
        { transaction: t }
      );

      // Insert users
      const usersRes = await sequelize.query(
        `INSERT INTO users (first_name, last_name, email, password, role_id) VALUES
        ('System', 'Admin', 'admin@admin.com', '${hashedPassword}', ${rolesMap['Admin']}),
        ('Support', 'Agent', 'agent@agent.com', '${hashedPassword}', ${rolesMap['Agent']}),
        ('Demo', 'Customer', 'customer@customer.com', '${hashedPassword}', ${rolesMap['Customer']})
        RETURNING *;`,
        { transaction: t }
      );

      const userMap = {};
      usersRes[0].forEach(u => {
        userMap[u.email] = u.user_id;
      });

      // Map agent to department
      await sequelize.query(
        `INSERT INTO user_department (user_id, dept_id) VALUES
        (${userMap['agent@agent.com']}, ${deptMap['Customer Service']});`,
        { transaction: t }
      );

      await t.commit();
      console.log("Database seeded successfully.");
    } catch (err) {
      await t.rollback();
      throw err;
    }
  } catch (error) {
    console.error("Seeding database failed:", error);
  }
}
