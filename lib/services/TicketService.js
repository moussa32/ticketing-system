import Category from "../database/models/Category"; 
import Urgency from "../database/models/Urgency";
import Department from "../database/models/Department"; 
import sequelize from "../../lib/database/connection.js";


export async function getCategoriesWithUrgency() {
  const [results]= await sequelize.query(
    `SELECT c.category_id,c.category_name, u.urgency_name, u.urgency_id, u.duration
     FROM Category c
     JOIN Urgency u ON c.urgency_id = u.urgency_id ORDER BY c.category_id;`
  );
    // Convert results to plain objects (just in case)
  return JSON.parse(JSON.stringify(results)); 
}

export async function getDepartments() {
  const depts = await Department.findAll();
  // Convert Sequelize models to plain objects
  return depts.map(d => d.get({ plain: true }));
}

export async function addTicket(subject, desc, status, deptId, catId, urgencyId, user_id, filename) {
  
  const [results] = await sequelize.query(
    `INSERT INTO ticket 
       (subject, description, status, dept_id, category_id, urgency_id, user_id, created_at, updated_at)
     VALUES 
       (:subject, :desc, :status, :deptId, :catId, :urgencyId, :user_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING ticket_id AS ticket_no;`,
    {
      replacements: { subject, desc, status, deptId, catId, urgencyId, user_id },
      type: sequelize.QueryTypes.INSERT,
    }
  );

  const ticket_no = results[0].ticket_no;

  if (filename) {
    await sequelize.query(
      `INSERT INTO ticket_attach(url, ticket_id)
       VALUES (:filename, :ticket_id);`,
      {
        replacements: { filename, ticket_id: ticket_no },
        type: sequelize.QueryTypes.INSERT,
      }
    );
  }

  return ticket_no;
}
