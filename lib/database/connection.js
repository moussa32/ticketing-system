import { Sequelize } from 'sequelize';
// Explicitly require pg to ensure it's loaded
import pg from 'pg';

// Create a new Sequelize instance
let sequelize;

  console.log('Using individual connection parameters');
  sequelize = new Sequelize(
    process.env.DB_DATABASE || 'ticketingSystem',
    process.env.DB_USERNAME || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      logging: console.log,
      dialectModule: pg, // Explicitly tell Sequelize to use this pg instance
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  );

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
