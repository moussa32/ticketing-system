const { Sequelize } = require('sequelize');
const config = require('./lib/database/config/config.js');
const env = 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false
});

async function checkCategories() {
  try {
    const results = await sequelize.query('SELECT * FROM "Categories"', { type: Sequelize.QueryTypes.SELECT });
    console.log('Categories:', JSON.stringify(results, null, 2));
    
    const urgencies = await sequelize.query('SELECT * FROM "Urgencies"', { type: Sequelize.QueryTypes.SELECT });
    console.log('Urgencies:', JSON.stringify(urgencies, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkCategories();
