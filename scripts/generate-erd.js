import fs from 'fs';
import { sequelize } from '../lib/database/index.js';
import sequelizeErd from 'sequelize-erd';

(async () => {
  try {
    const svg = await sequelizeErd({ source: sequelize });
    fs.writeFileSync('./erd.svg', svg);
    console.log('ERD generated successfully at ./erd.svg');
    process.exit(0);
  } catch (error) {
    console.error('Error generating ERD:', error);
    process.exit(1);
  }
})();
