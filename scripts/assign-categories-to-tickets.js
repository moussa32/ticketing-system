const { sequelize, Tickets, Categories } = require('../lib/database');

async function assignCategories() {
  try {
    const categories = await Categories.findAll();
    if (categories.length === 0) {
      console.log('No categories found. Please create categories first.');
      return;
    }

    const tickets = await Tickets.findAll({ where: { categoryId: null } });
    console.log(`Found ${tickets.length} tickets without categories.`);

    for (const ticket of tickets) {
      // Assign a random category
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      await ticket.update({ categoryId: randomCategory.id });
      console.log(`Assigned category '${randomCategory.name}' to ticket #${ticket.id}`);
    }

    console.log('Done assigning categories.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

assignCategories();
