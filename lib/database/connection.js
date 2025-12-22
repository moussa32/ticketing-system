import { Sequelize } from "sequelize";
import pg from "pg";
import seedDatabase from "./seed.js";

// Create Sequelize instance
let sequelize = new Sequelize(
  process.env.DB_DATABASE || "ticketingSystem",
  process.env.DB_USERNAME || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    logging: console.log,
    dialectModule: pg,

    // IMPORTANT: PostgreSQL local server does NOT support SSL
    dialectOptions: {
      ssl: false,
    },
  }
);

// Test connection
sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connection has been established successfully.");
   // await seedDatabase();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
