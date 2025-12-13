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

export { sequelize, Users, Tickets, Sessions, Categories };
export default sequelize;
