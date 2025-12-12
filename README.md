This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Functionalites 

### Login & Registeration

- the system has three type of users admin, agent, customer. all of them will be stored in same user entity with the different role types

- each type has its own endpoint, but the have common login/register workflow

- workflow
    - login 
            - validate email in user table.
                - if not, return error the user is not registered yet
                - if yes, validate password, by encrypting user the password and comparing it with
                          with stored password by decrypt package
                            - if yes. generate and return token by jwt package
                            - if no return error. no valid password
    - register
            - validate if no user in the table has same email
                - if yes. 
                    - will encrypt the password. then store data in the database
                    - generate and return new token
                - if no
                    - return error, the user has account already

    - middleware.
        - when the request hits the server.
            - the middleware will check and decrypt the token.
                to extract the payload that contains  date, role, id,
                    middleware should check if the role is required for accessing the function is valid.

**Abdelrahman**

- **Summary of work done**: converted role string values from UPPERCASE to lowercase across the auth flow to match the database ENUM and unify role handling. Updated login/register seed data and adjusted client/server role mappings so redirects and authorization checks use `admin`, `agent`, `customer`.

- **Files changed**:
    - `app/login/page.js` — client login page and `ROLES` mapping
    - `lib/services/authService.js` — centralized auth logic and `ROLES` constants
    - `lib/database/seed.js` — seeded users with lowercase roles

- **Pages**:
    - `app/login/page.js` — Login page (client-side form)
    - `app/register/page.js` — Registration page
    - `app/profile/page.js` — User profile
    - `app/profile/change-password/page.js` — Change password page
    - `app/dashboard/admin/page.jsx` — Admin dashboard (users/categories management)
    - `app/dashboard/agent/page.js` — Agent dashboard
    - `app/dashboard/customer/page.js` — Customer dashboard

- **API Endpoints** (main auth/user endpoints):
    - `POST /api/auth/login` — Login endpoint (returns JWT and user info)
    - `POST /api/auth/register` — Register new user
    - `POST /api/auth/logout` — Logout
    - `GET|PUT /api/user/profile` — Get or update profile
    - `POST /api/user/change-password` — Change password
    - `GET /api/users` — (admin) list users

- **Branch**: `feature/user-authentication`

- **Mermaid: Authentication flow**

```mermaid
flowchart TD
    A[User (Login Page)] -->|POST /api/auth/login| B[Auth Route (/api/auth/login)]
    B --> C[authService.validateCredentials(email,password)]
    C --> D[(Users table)]
    C -->|success| E[Generate JWT & payload (id, role, signDate)]
    E --> F[Return token & user]
    F --> G[Client stores token (localStorage/cookie) & redirects to dashboard]
    C -->|fail| H[Return error response]
```

- **Mermaid: Role mapping & helper diagram**

```mermaid
graph LR
    subgraph Client
        L1[`ROLES.ADMIN = "admin"`]
        L2[`ROLES.AGENT = "agent"`]
        L3[`ROLES.CUSTOMER = "customer"`]
    end
    L1 --> DB[(Users.role ENUM: 'admin','agent','customer')]
    L2 --> DB
    L3 --> DB
    DB --> AuthService[lib/services/authService.js uses lowercase roles for checks]
    AuthService --> Middleware[lib/auth/middleware.js validates JWT + role requirement]
```

- **Notes & Next steps**:
    - The database model/migrations already use lowercase ENUM values (`'admin','agent','customer'`) — this change aligns client/server strings with the DB.
    - If you want, I can commit this README update and push to `feature/user-authentication`, or include additional diagrams (sequence diagram, swimlane) for more detail.

    ---

    ### Auth service functions (detailed)

    Below are the functions implemented/used in `lib/services/authService.js` with short explanations, parameters and returned values. These match the current code in the repository.

    - `generateNewToken(payload)`
        - Description: Create and sign a JWT containing the provided payload plus a `signDate`.
        - Params: `payload` (Object) — data to include in the token (typically `{ id, role }`).
        - Returns: `string` — signed JWT.

    - `verifyToken(token)`
        - Description: Verify and decode the JWT using the server signing key.
        - Params: `token` (string) — JWT to verify.
        - Returns: `Object` — decoded payload (throws if invalid).

    - `hashingPassword(password, rounds)`
        - Description: Hash a plain text password with bcrypt. The repo uses 10 rounds where explicit.
        - Params: `password` (string), `rounds` (number, optional) — salt rounds for bcrypt.
        - Returns: `Promise<string>` — hashed password.
        - Note: If `rounds` is omitted, bcrypt uses its default (commonly 10).

    - `validatePassword(plainTextPassword, hashPassword)`
        - Description: Compare a plain password with a bcrypt hash.
        - Params: `plainTextPassword` (string), `hashPassword` (string).
        - Returns: `Promise<boolean>` — true when passwords match.

    - `registerUser(role, userInfo)`
        - Description: Register a new user with the provided role and user info.
        - Params: `role` (string), `userInfo` (object with `email`, `password`, `firstName`, `lastName`).
        - Behavior: Checks for existing email, hashes password, creates user record and returns a token plus meta.
        - Returns: `Promise<Object>` — `{ firstName, role, id, access_token }` on success; throws on failure.

    - `loginUser(userInfo)`
        - Description: Authenticate email/password and return user info and token.
        - Params: `userInfo` (object with `email`, `password`).
        - Behavior: Finds user by email, validates password, returns token+user data.
        - Returns: `Promise<Object>` — `{ id, role, firstName, access_token }` on success; throws on failure.

    - `validateUserAccess(token)`
        - Description: Verify token and return decoded payload (used by middleware).
        - Params: `token` (string).
        - Returns: `Object` — decoded token payload (id, role, signDate, ...).

    - `changePassword(id, userInfo)`
        - Description: Change a user's password and return a refreshed token.
        - Params: `id` (number|string), `userInfo` (object with `password`).
        - Behavior: Hashes new password, upserts user record and returns updated info and token.
        - Returns: `Promise<Object>` — `{ firstName, access_token }`.

    - `updateProfile(id, userInfo)`
        - Description: Update non-sensitive profile fields for a user (disallows email/password updates via this function).
        - Params: `id`, `userInfo` (object with profile fields to update).
        - Behavior: Uses `upsert` to update user and returns the updated record.
        - Returns: `Promise<Object>` — updated user record.

    - `forgetPassword(email)`
        - Description: Stub that checks existence of a user by email. Intended to start forget-password flow (send email, token, etc.).
        - Params: `email` (string).
        - Behavior: Throws if user does not exist.

    - `fullbackForgetPassword(params)`
        - Description: Empty stub in the current codebase for any follow-up forget-password logic (e.g., generate reset token, send email).
        - Params: `params` — TBD.

    These functions are currently used by the API routes under `app/api/auth/*` and by middleware that verifies tokens and role-based access. If you'd like, I can also add example request/response snippets for `POST /api/auth/login` and `POST /api/auth/register` to this README.