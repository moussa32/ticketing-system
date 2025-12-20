import sequelize from './connection.js';
import Users from './models/Users.js';
import Tickets from './models/Tickets.js';
import Sessions from './models/Sessions.js';
import Categories from './models/Categories.js';

import Urgency from './models/Urgency.js';

// Define associations
Users.hasMany(Tickets, { foreignKey: 'assignedTo', as: 'assignedTickets' });
Users.hasMany(Tickets, { foreignKey: 'customerId', as: 'customerTickets' });
Users.hasMany(Sessions, { foreignKey: 'userId', as: 'sessions' });

Tickets.belongsTo(Users, { foreignKey: 'assignedTo', as: 'assignedAgent' });
Tickets.belongsTo(Users, { foreignKey: 'customerId', as: 'customer' });

Sessions.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
import seedDefaultUsers from './seed.js';

// Auto seed users on startup (idempotent)
sequelize.authenticate()
	.then(async () => {
		try {
			console.log('Database connection has been established successfully. Running seeds...');
			await seedDefaultUsers(Users);
			console.log('Seeding complete');
		} catch (err) {
			console.error('Seeding on startup failed:', err);
		}
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

Categories.belongsTo(Urgency, { foreignKey: 'urgencyId', as: 'urgency' });
Urgency.hasMany(Categories, { foreignKey: 'urgencyId', as: 'categories' });

Categories.hasMany(Tickets, { foreignKey: 'categoryId', as: 'tickets' });
Tickets.belongsTo(Categories, { foreignKey: 'categoryId', as: 'category' });

export { sequelize, Users, Tickets, Sessions, Categories, Urgency };
export default sequelize;
