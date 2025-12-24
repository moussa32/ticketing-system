"use server";

import { Users, Tickets, Categories, Urgency } from "@/lib/database";
import { TICKET_STATUSES } from '../../../../app/constants/constants.js';


export async function getTicketStats() {
  try {
    const stats = await Tickets.findAll({
      attributes: [
        "status",
        [Tickets.sequelize.fn("COUNT", Tickets.sequelize.col("id")), "count"],
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
    const tickets = await Tickets.findAll({
      include: [
        {
          model: Users,
          as: "assignedAgent",
          attributes: ["id", "firstName", "lastName", "email"],
          required: false,
        },
        {
          model: Users,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
          required: true,
        },
        {
          model: Categories,
          as: "category",
          include: [
            {
              model: Urgency,
              as: "urgency",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return JSON.parse(JSON.stringify(tickets));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}
