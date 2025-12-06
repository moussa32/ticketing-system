import sequelize from './connection.js';
import Users from './models/Users.js';
import Tickets from './models/Tickets.js';
import Sessions from './models/Sessions.js';
import Categories from './models/Categories.js';

// Define associations
Users.hasMany(Tickets, { foreignKey: 'assignedTo', as: 'assignedTickets' });
Users.hasMany(Tickets, { foreignKey: 'customerId', as: 'customerTickets' });
Users.hasMany(Sessions, { foreignKey: 'userId', as: 'sessions' });

Tickets.belongsTo(Users, { foreignKey: 'assignedTo', as: 'assignedAgent' });
Tickets.belongsTo(Users, { foreignKey: 'customerId', as: 'customer' });

Sessions.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export { sequelize, Users, Tickets, Sessions, Categories };
export default sequelize;
