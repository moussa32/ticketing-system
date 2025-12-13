'use server';

import { Users, Tickets, Categories, Urgency } from '@/lib/database';

export async function getTicketStats() {
  try {
    const stats = await Tickets.findAll({
      attributes: [
        'status',
        [Tickets.sequelize.fn('COUNT', Tickets.sequelize.col('id')), 'count']
      ],
      group: ['status']
    });
    
    const statsObject = {
      open: 0,
      inProgress: 0,
      pending: 0,
      resolved: 0,
      closed: 0
    };
    
    stats.forEach(stat => {
      const status = stat.dataValues.status;
      const count = parseInt(stat.dataValues.count);
      
      switch(status) {
        case 'Open':
          statsObject.open = count;
          break;
        case 'In Progress':
          statsObject.inProgress = count;
          break;
        case 'Pending':
          statsObject.pending = count;
          break;
        case 'Resolved':
          statsObject.resolved = count;
          break;
        case 'Closed':
          statsObject.closed = count;
          break;
      }
    });
    
    return statsObject;
  } catch (error) {
    console.error('Error fetching ticket stats:', error);
    return {
      open: 0,
      inProgress: 0,
      pending: 0,
      resolved: 0,
      closed: 0
    };
  }
}

export async function getAllTickets() {
  try {
    const tickets = await Tickets.findAll({
      include: [
        {
          model: Users,
          as: 'assignedAgent',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: false
        },
        {
          model: Users,
          as: 'customer',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          required: true
        },
        {
          model: Categories,
          as: 'category',
          include: [
            {
              model: Urgency,
              as: 'urgency'
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    return JSON.parse(JSON.stringify(tickets));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
}
