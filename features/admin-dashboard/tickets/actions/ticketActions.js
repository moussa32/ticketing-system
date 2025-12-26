"use server";

import { Users, Ticket, Category, Urgency,UserDepartment,Department } from "@/lib/database";
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';


export async function getTicketStats() {
  try {
    const stats = await Ticket.findAll({
      attributes: [
        "status",
        [Ticket.sequelize.fn("COUNT", Ticket.sequelize.col("ticket_id")), "count"],
      ],
      group: ["status"],
    });

    const statsObject = {
      [TICKET_STATUSES.OPEN]: 0,
      [TICKET_STATUSES.IN_PROGRESS]: 0,
      [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: 0,
      [TICKET_STATUSES.AWAITING_AGENT_REPLY]: 0,
      [TICKET_STATUSES.CLOSED]: 0,
    };

    stats.forEach((stat) => {
      const status = stat.dataValues.status;
      const count = parseInt(stat.dataValues.count);

      switch (status) {
        case TICKET_STATUSES.OPEN:
          statsObject[TICKET_STATUSES.OPEN] = count;
          break;
        case TICKET_STATUSES.IN_PROGRESS:
          statsObject[TICKET_STATUSES.IN_PROGRESS] = count;
          break;
        case TICKET_STATUSES.AWAITING_CUSTOMER_REPLY:
          statsObject[TICKET_STATUSES.AWAITING_CUSTOMER_REPLY] = count;
          break;
        case TICKET_STATUSES.AWAITING_AGENT_REPLY:
          statsObject[TICKET_STATUSES.AWAITING_AGENT_REPLY] = count;
          break;
        case TICKET_STATUSES.CLOSED:
          statsObject[TICKET_STATUSES.CLOSED] = count;
          break;
      }
    });

    return statsObject;
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    return {
      [TICKET_STATUSES.OPEN]: 0,
      [TICKET_STATUSES.IN_PROGRESS]: 0,
      [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: 0,
      [TICKET_STATUSES.AWAITING_AGENT_REPLY]: 0,
      [TICKET_STATUSES.CLOSED]: 0,
    };
  }
}

export async function getAllTickets() {
  try {
    const tickets = await Ticket.findAll({
      include: [

        // Ticket creator
        {
          model: Users,
          attributes: ["user_id", "first_name", "last_name", "email"],
        },

        // Category + Urgency
        {
          model: Category,
          attributes: ["category_id", "category_name"],
          include: [
            {
              model: Urgency,
              attributes: ["urgency_id", "urgency_name", "duration"],
            },
          ],
        },

        // Ticket’s assigned department AND users in that department
        {
          model: Department,
          attributes: ["dept_id", "dept_name"],
          include: [
            {
              model: Users,                       // THIS is the correct nested include
              through: { attributes: [] },       // hides pivot columns
              attributes: [
                "user_id",
                "first_name",
                "last_name",
                "email",
              ],
            },
          ],
        },

      ],
      order: [["created_at", "DESC"]],
    });
    console.log('Fetched Tickets:', JSON.parse(JSON.stringify(tickets)));
    return JSON.parse(JSON.stringify(tickets));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}


