# Authentication & Authorization Setup

This document explains the authentication and authorization system implemented in the ticketing system application.

## Overview

The application uses JWT (JSON Web Tokens) for authentication with role-based access control (RBAC) for authorization. Users can have one of three roles:

- **ADMIN**: Full access to admin dashboard and all features
- **AGENT**: Access to agent dashboard for ticket management
- **CUSTOMER**: Access to customer dashboard for creating and viewing tickets

## Architecture

### Components

#### 1. **Auth Service** (`/lib/services/authService.js`)
- `registerUser(role, userInfo)` - Registers a new user with a specific role
- `loginUser(userInfo)` - Authenticates a user and returns a JWT token
- `validateUserAccess(role, token)` - Validates if a user has a specific role

#### 2. **Auth Middleware** (`/lib/auth/middleware.js`)
- `verifyToken(token)` - Verifies JWT token validity
- `withAuth(options)` - Middleware function for protecting server routes
- `getUserFromHeaders(request)` - Extracts user info from request headers

#### 3. **Auth Hook** (`/lib/auth/useAuth.js`)
Client-side hook for managing authentication state:
- `user` - Current logged-in user info
- `loading` - Loading state during auth check
- `isAuthenticated` - Boolean indicating if user is logged in
- `login(token, userInfo)` - Stores auth token and user data
- `logout()` - Clears auth data and redirects to login
- `hasRole(roles)` - Checks if user has specified role(s)

#### 4. **Protected Route Wrapper** (`/components/ProtectedRoute.jsx`)
Higher-order component to protect React components with role-based access

## File Structure

```
app/
  ├── page.js                          # Root redirect page
  ├── login/
  │   └── page.js                      # Login page (public)
  ├── unauthorized/
  │   └── page.js                      # Unauthorized access page
  ├── api/
  │   └── auth/
  │       ├── login/
  │       │   └── route.js             # Login API endpoint
  │       └── logout/
  │           └── route.js             # Logout API endpoint
  └── dashboard/
      ├── page.js                      # Dashboard redirect
      ├── admin/
      │   ├── layout.jsx               # Admin layout (protected)
      │   └── page.jsx                 # Admin dashboard
      ├── agent/
      │   ├── layout.jsx               # Agent layout (protected)
      │   └── page.js                  # Agent dashboard
      └── customer/
          ├── layout.jsx               # Customer layout (protected)
          └── page.js                  # Customer dashboard

lib/
  ├── services/
  │   └── authService.js               # Auth business logic
  └── auth/
      ├── middleware.js                # Auth middleware
      └── useAuth.js                   # Auth hook
```

## How It Works

### 1. Login Flow

1. User navigates to `/login`
2. User enters email, password, and selects role
3. Form submits to `/api/auth/login` endpoint
4. Server validates credentials with `authService.loginUser()`
5. If valid, server returns JWT token
6. Client stores token in localStorage and sets cookie
7. User is redirected to role-specific dashboard
8. Dashboard layout verifies token and role

### 2. Protected Route Access

**Flow for accessing protected dashboard:**

```
User visits /dashboard/admin
    ↓
Admin Layout checks authentication via useAuth()
    ↓
Is user authenticated? (Check localStorage)
    ├─ No → Redirect to /login
    └─ Yes → Check role
        ├─ User is ADMIN? 
        │   └─ Yes → Render dashboard
        └─ No → Redirect to /unauthorized
```

### 3. Token Management

**Storage:**
- `localStorage` - Token stored for client-side access
- Cookies - Secure HTTP-only cookie for server verification (when needed)

**Token Structure (JWT):**
```json
{
  "id": "user_id",
  "role": "ADMIN|AGENT|CUSTOMER",
  "signDate": "timestamp"
}
```

## Usage Examples

### Protecting a Component with Role Check

```javascript
'use client';

import { useAuth } from '@/lib/auth/useAuth';

export default function AdminComponent() {
  const { user, hasRole, logout } = useAuth();

  if (!hasRole('ADMIN')) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Creating a Protected Page

1. Create page in role-specific folder:
   ```
   /app/dashboard/admin/my-feature/page.js
   ```

2. The parent layout (`/app/dashboard/admin/layout.jsx`) handles authentication

3. Page will only be accessible to ADMIN users

### Adding Role-Based Navigation

```javascript
import { useAuth } from '@/lib/auth/useAuth';
import Link from 'next/link';

export default function Navbar() {
  const { user, hasRole, logout } = useAuth();

  if (!user) return null;

  return (
    <nav>
      {hasRole('ADMIN') && <Link href="/dashboard/admin/users">Users</Link>}
      {hasRole('AGENT') && <Link href="/dashboard/agent/tickets">Tickets</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
```

## API Endpoints

### POST `/api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "ADMIN"
}
```

**Response (Success):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGc...",
  "firstName": "John",
  "id": "user_id",
  "role": "ADMIN"
}
```

**Response (Error):**
```json
{
  "message": "Email and password are required"
}
```

### POST `/api/auth/logout`

**Response:**
```json
{
  "message": "Logout successful"
}
```

## Security Considerations

1. **Passwords**: Hashed using bcrypt (10 rounds)
2. **Tokens**: Signed with secret key (GRADUATION_PROJECT)
3. **Cookies**: Set as httpOnly in production
4. **CORS**: Configure as needed for your deployment
5. **Token Expiration**: Consider adding token expiration
6. **HTTPS**: Use in production only

## Demo Credentials

For testing, use these credentials:

```
Admin:
  Email: admin@example.com
  Password: password123

Agent:
  Email: agent@example.com
  Password: password123

Customer:
  Email: customer@example.com
  Password: password123
```

## Future Improvements

1. Add token refresh mechanism
2. Implement password reset functionality
3. Add two-factor authentication
4. Add activity logging
5. Implement session management
6. Add rate limiting on auth endpoints
7. Store user preferences
8. Add OAuth/SSO integration

## Troubleshooting

### User keeps getting redirected to login

- Check if token is properly stored in localStorage
- Verify token expiration hasn't passed
- Check browser console for errors

### Unauthorized page appears unexpectedly

- Verify user has the correct role assigned
- Check role spelling (case-sensitive)
- Ensure token hasn't expired

### Login returns 404 error

- Verify `/api/auth/login` route exists
- Check server console for errors
- Verify authService.loginUser() is working
