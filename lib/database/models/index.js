import Role from "./Role.js";
import Department from "./Department.js";
import Urgency from "./Urgency.js";
import Category from "./Category.js";
import Users from "./Users.js";
import UserDepartment from "./UserDepartment.js";
import Ticket from "./Ticket.js";
import ReplyTicket from "./ReplyTicket.js";
import TicketAttach from "./TicketAttachment.js";
import CustomerSurvey from "./CustomerSurvey.js";
import CustomerComplaint from "./CustomerComplaint.js";
import Faq from "./Faq.js";

/* =========================
   Associations
========================= */

// Role - Users
Role.hasMany(Users, { foreignKey: "role_id" });
Users.belongsTo(Role, { foreignKey: "role_id" });

// Urgency - Category
Urgency.hasMany(Category, { foreignKey: "urgency_id" });
Category.belongsTo(Urgency, { foreignKey: "urgency_id" });


Users.belongsToMany(Department, {
  through: UserDepartment,
  foreignKey: "user_id",
  otherKey: "dept_id",
});

Department.belongsToMany(Users, {
  through: UserDepartment,
  foreignKey: "dept_id",
  otherKey: "user_id",
});


// Ticket relations
Ticket.belongsTo(Users, { foreignKey: "user_id" });
Ticket.belongsTo(Category, { foreignKey: "category_id" });
Ticket.belongsTo(Urgency, { foreignKey: "urgency_id" });
Ticket.belongsTo(Department, { foreignKey: "dept_id" });

Users.hasMany(Ticket, { foreignKey: "user_id" });
Category.hasMany(Ticket, { foreignKey: "category_id" });
Urgency.hasMany(Ticket, { foreignKey: "urgency_id" });
Department.hasMany(Ticket, { foreignKey: "dept_id" });

// ReplyTicket relations
ReplyTicket.belongsTo(Ticket, { foreignKey: "ticket_id" });
ReplyTicket.belongsTo(Users, { foreignKey: "user_id" });

Ticket.hasMany(ReplyTicket, { foreignKey: "ticket_id" });
Users.hasMany(ReplyTicket, { foreignKey: "user_id" });

// Ticket attachments
TicketAttach.belongsTo(Ticket, { foreignKey: "ticket_id" });
TicketAttach.belongsTo(ReplyTicket, { foreignKey: "reply_id" });

Ticket.hasMany(TicketAttach, { foreignKey: "ticket_id" });
ReplyTicket.hasMany(TicketAttach, { foreignKey: "reply_id" });

// Customer Survey
CustomerSurvey.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(CustomerSurvey, { foreignKey: "user_id" });

// Customer Complaint
CustomerComplaint.belongsTo(Users, { foreignKey: "user_id" });
CustomerComplaint.belongsTo(Ticket, { foreignKey: "ticket_id" });

Users.hasMany(CustomerComplaint, { foreignKey: "user_id" });
Ticket.hasMany(CustomerComplaint, { foreignKey: "ticket_id" });

/* =========================
   Exports (IMPORTANT)
========================= */

export {
  Role,
  Department,
  Urgency,
  Category,
  Users,
  UserDepartment,
  Ticket,
  ReplyTicket,
  TicketAttach,
  CustomerSurvey,
  CustomerComplaint,
  Faq
};
