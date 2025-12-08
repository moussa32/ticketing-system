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


export async function getAllTicketsByUserID(userId) {
  const results= await sequelize.query(
    `select t.ticket_id as ticketNo,t.subject as subject,t.description as description,dept.dept_name as departmentName,cat.category_name as categoryName,
     ur.urgency_name as priority,t.status as status,  TO_CHAR(t.created_at, 'YYYY-MM-DD HH24:MI') AS createdat,att.url as attachURL,ur.duration as duration
     from ticket t LEFT JOIN ticket_attach att
     on t.ticket_id=att.ticket_id
     join category cat
     on t.category_id=cat.category_id
     join urgency ur
     on t.urgency_id=ur.urgency_id
     join department dept
     on t.dept_id=dept.dept_id
     where t.user_id=:userId order by t.created_at desc;`
     ,
     {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT
     }
  );
    // Convert results to plain objects (just in case)
  return results; 
}


export async function getTicketDetails(ticketId) {
  const results= await sequelize.query(
    `select t.ticket_id as ticketNo,t.subject as subject,t.description as description,dept.dept_name as departmentName,cat.category_name as categoryName,
      ur.urgency_name as priority,t.status as status,  TO_CHAR(t.created_at, 'YYYY-MM-DD HH24:MI') AS createdat,att.url as attachURL,ur.duration as duration
      from ticket t LEFT JOIN ticket_attach att
      on t.ticket_id=att.ticket_id
      join category cat
      on t.category_id=cat.category_id
      join urgency ur
      on t.urgency_id=ur.urgency_id
      join department dept
      on t.dept_id=dept.dept_id
      where t.ticket_id=:ticketId;`
      ,
      {
        replacements: { ticketId },
        type: sequelize.QueryTypes.SELECT
      }
  );

    // Convert results to plain objects (just in case)
  return results[0]; 
}

 async function deleteTicket(ticketId) {
  await sequelize.query(
    `DELETE FROM ticket WHERE ticket_id = :ticketId;`,
    {
      replacements: { ticketId },
      type: sequelize.QueryTypes.DELETE,
    }
  );
}

 async function getTicketAttachment(ticketId) {
  const results= await sequelize.query(
    `SELECT url FROM ticket_attach WHERE ticket_id = :ticketId;`,
    {
      replacements: { ticketId },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return results.length > 0 ? results[0].url : null;
}

 async function deleteTicketAttachment(ticketId) {
  await sequelize.query(
    `DELETE FROM ticket_attach WHERE ticket_id = :ticketId;`,
    {
      replacements: { ticketId },
      type: sequelize.QueryTypes.DELETE,
    }
  );
}

export async function deleteTicketWithAttachment(ticketId) {
  const fileName = await getTicketAttachment(ticketId);
  /*if (fileName) {
    const filePath = path.join(process.cwd(), "public", "attachments", "customer", attachmentUrl);
    if (fs.existsSync(filePath)) {      
      fs.unlinkSync(filePath);
    }*/ 
    await deleteTicketAttachment(ticketId);
 // } 
  await deleteTicket(ticketId);
} 
