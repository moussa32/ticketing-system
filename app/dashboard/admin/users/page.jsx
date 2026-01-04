import UsersTable from "@/features/admin-dashboard/users/components/UsersTable";
import {
  getAllUsers,
  getRoles,
} from "@/features/admin-dashboard/users/actions/userActions";

export default async function UsersPage() {
  // Fetch users and roles using server components
  const [users, roles] = await Promise.all([getAllUsers(), getRoles()]);

  return (
    <div>
      <UsersTable users={users} roles={roles} />
    </div>
  );
}
