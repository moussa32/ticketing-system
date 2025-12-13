# Admin Dashboard - Setup Instructions

## Quick Start

### 1. Run Database Migrations

Execute the following command to create the database tables and populate sample data:

```bash
npm run migrate
```

This will:
- Add `role`, `password`, and `isActive` fields to the Users table
- Create the Tickets table
- Create the Sessions table  
- Insert 5 sample users (1 admin, 2 agents, 2 customers)
- Insert 7 sample tickets with various statuses

### 2. Start the Development Server

If not already running:

```bash
npm run dev
```

### 3. Access the Admin Dashboard

Open your browser and navigate to:

```
http://localhost:3000/dashboard/admin
```

## Sample Users

After running migrations, you'll have these test users:

| Email | Password | Role |
|-------|----------|------|
| admin@ticketing.com | admin123 | Admin |
| john.agent@ticketing.com | agent123 | Agent |
| sarah.agent@ticketing.com | agent123 | Agent |
| mike@example.com | customer123 | Customer |
| emma@example.com | customer123 | Customer |

> ⚠️ **Note:** Passwords are currently stored in plain text. In production, implement password hashing with bcrypt.

## Features to Test

### Users Management
- ✏️ Click the three-dots menu on any user
- Try editing user information
- Test the reset password function
- Verify role badges display correctly

### Tickets Overview
- Check that status cards show correct counts
- Verify tickets table displays all ticket information
- Look for status and priority badges
- Confirm user avatars appear correctly

## Troubleshooting

### Migration Errors

If you encounter migration errors, you can rollback:

```bash
npm run migrate:rollback
```

Then run migrations again:

```bash
npm run migrate
```

### Database Connection Issues

Make sure your PostgreSQL database is running and the connection details in your `.env` file are correct:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ticketingSystem
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

## Next Steps

1. **Implement Authentication** - Add proper login/logout functionality
2. **Hash Passwords** - Use bcrypt to hash passwords before storing
3. **Add Authorization** - Restrict admin dashboard to admin users only
4. **Implement Server Actions** - Complete the TODO items in user action handlers
5. **Add Real-time Updates** - Consider WebSockets for live ticket updates

## File Structure

```
ticketing-system/
├── app/dashboard/admin/page.jsx          # Main dashboard page
├── components/ui/                         # Shared UI components
├── features/admin-dashboard/
│   ├── actions/                          # Server actions
│   └── components/                       # Feature components
└── lib/database/
    ├── migrations/                       # Database migrations
    └── models/                           # Sequelize models
```

## Support

For issues or questions, refer to the [walkthrough.md](file:///C:/Users/Mores/.gemini/antigravity/brain/26d77f55-2ef5-4b6d-bad7-0fb54f06c56e/walkthrough.md) for detailed documentation.
