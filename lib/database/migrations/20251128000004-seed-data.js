'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample users
    const users = await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@ticketing.com',
        role: 'admin',
        password: 'admin123', // In production, this should be hashed
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Agent',
        email: 'john.agent@ticketing.com',
        role: 'agent',
        password: 'agent123',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Sarah',
        lastName: 'Agent',
        email: 'sarah.agent@ticketing.com',
        role: 'agent',
        password: 'agent123',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Mike',
        lastName: 'Customer',
        email: 'mike@example.com',
        role: 'customer',
        password: 'customer123',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Emma',
        lastName: 'Customer',
        email: 'emma@example.com',
        role: 'customer',
        password: 'customer123',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Insert sample categories
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Technical Support',
        description: 'Technical issues and troubleshooting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billing',
        description: 'Payment and billing related inquiries',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Feature Request',
        description: 'Requests for new features or improvements',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bug Report',
        description: 'Report bugs and issues in the system',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Account Management',
        description: 'Account settings and profile management',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'General Inquiry',
        description: 'General questions and information requests',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Insert sample tickets
    await queryInterface.bulkInsert('Tickets', [
      {
        title: 'Cannot login to account',
        description: 'I am unable to login to my account. Getting invalid credentials error.',
        status: 'Open',
        priority: 'High',
        assignedTo: null,
        customerId: 4, // Mike Customer
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Payment not processed',
        description: 'My payment was deducted but order not confirmed.',
        status: 'In Progress',
        priority: 'Urgent',
        assignedTo: 2, // John Agent
        customerId: 5, // Emma Customer
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Feature request: Dark mode',
        description: 'Would love to see a dark mode option in the app.',
        status: 'Pending',
        priority: 'Low',
        assignedTo: 3, // Sarah Agent
        customerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bug: Images not loading',
        description: 'Product images are not loading on mobile devices.',
        status: 'Resolved',
        priority: 'Medium',
        assignedTo: 2,
        customerId: 5,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date()
      },
      {
        title: 'Account deletion request',
        description: 'Please delete my account and all associated data.',
        status: 'Closed',
        priority: 'Medium',
        assignedTo: 2,
        customerId: 4,
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date()
      },
      {
        title: 'Email notifications not working',
        description: 'Not receiving any email notifications.',
        status: 'Open',
        priority: 'Medium',
        assignedTo: null,
        customerId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Refund request',
        description: 'Need refund for order #12345',
        status: 'In Progress',
        priority: 'High',
        assignedTo: 3,
        customerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tickets', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
