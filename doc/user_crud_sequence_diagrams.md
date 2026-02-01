# User CRUD Sequence Diagrams

## 1. Create User

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Admin Dashboard
    participant Action as Server Action (createUser)
    participant DB as Database

    Note over Admin, DB: CREATE USER FLOW
    Admin->>UI: Click "Add User"
    UI->>UI: Open AddUserModal
    Admin->>UI: Fill Form & Submit
    UI->>Action: createUser(formData)
    activate Action
    Action->>DB: Users.findOne({ email })
    activate DB
    alt Email Exists
        DB-->>Action: User Found
        Action-->>UI: Error: "Email exists"
        UI-->>Admin: Show Error
    else Email Unique
        DB-->>Action: null
        Action->>DB: Users.create(data)
        DB-->>Action: User Created
        deactivate DB
        Action-->>UI: Success & User Data
        deactivate Action
        UI->>UI: Refresh List & Close Modal
    end
```

## 2. Read Users (List View)

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Admin Dashboard
    participant Page as UsersPage
    participant Action as Server Action (getAllUsers)
    participant DB as Database

    Note over Admin, DB: READ USERS FLOW
    Admin->>Page: Visit /admin/users
    activate Page
    Page->>Action: getAllUsers()
    activate Action
    Action->>DB: Users.findAll({ include: Role })
    activate DB
    DB-->>Action: Return Users
    deactivate DB
    Action-->>Page: Return Users List
    deactivate Action
    Page-->>UI: Render UsersTable
    deactivate Page
    UI-->>Admin: Display Table
```

## 3. Update User (Edit Details)

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Admin Dashboard
    participant Action as Server Action (updateUser)
    participant DB as Database

    Note over Admin, DB: UPDATE USER FLOW
    Admin->>UI: Click "Edit" on User
    UI->>UI: Open EditUserModal
    Admin->>UI: Change Details & Save
    UI->>Action: updateUser(id, data)
    activate Action
    Action->>DB: Users.findByPk(id)
    activate DB
    DB-->>Action: Return User
    Action->>DB: user.update(data)
    DB-->>Action: Update Success
    deactivate DB
    Action-->>UI: Success Message
    deactivate Action
    UI->>UI: Refresh List & Close Modal
```

## 4. Delete User (Conceptual)

_Note: This feature is currently not implemented in the codebase._

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Admin Dashboard
    participant Action as Server Action (deleteUser)
    participant DB as Database

    Note over Admin, DB: DELETE USER FLOW
    Admin->>UI: Click "Delete" (Future)
    UI->>UI: Confirm Deletion
    UI->>Action: deleteUser(id)
    activate Action
    Action->>DB: Users.destroy({ where: { id } })
    activate DB
    DB-->>Action: Success
    deactivate DB
    Action-->>UI: Success Message
    deactivate Action
    UI->>UI: Refresh List
```
