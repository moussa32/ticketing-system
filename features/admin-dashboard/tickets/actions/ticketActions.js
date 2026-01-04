"use server";

import { Users, Ticket, Category, Urgency } from "@/lib/database";

export async function getTicketStats() {
  try {
    const stats = await Ticket.findAll({
      attributes: [
        "status",
        [
          Ticket.sequelize.fn("COUNT", Ticket.sequelize.col("ticket_id")),
          "count",
        ],
      ],
      group: ["status"],
    });

    const statsObject = {
      open: 0,
      inProgress: 0,
      pending: 0,
      resolved: 0,
      closed: 0,
    };

    stats.forEach((stat) => {
      const status = stat.dataValues.status;
      const count = parseInt(stat.dataValues.count);

      switch (status) {
        case "Open":
          statsObject.open = count;
          break;
        case "In Progress":
          statsObject.inProgress = count;
          break;
        case "Pending":
          statsObject.pending = count;
          break;
        case "Resolved":
          statsObject.resolved = count;
          break;
        case "Closed":
          statsObject.closed = count;
          break;
      }
    });

    return statsObject;
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    return {
      open: 0,
      inProgress: 0,
      pending: 0,
      resolved: 0,
      closed: 0,
    };
  }
}

export async function getAllTickets() {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: Users,
          attributes: ["user_id", "first_name", "last_name", "email"],
        },
        {
          model: Category,
          include: [
            {
              model: Urgency,
            },
          ],
        },
        {
          model: Urgency,
        },
      ],
      order: [["ticket_id", "DESC"]],
    });

    return JSON.parse(JSON.stringify(tickets));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}
