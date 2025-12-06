import UsersTable from '@/features/admin-dashboard/users/components/UsersTable';
import { getAllUsers } from '@/features/admin-dashboard/users/actions/userActions';

export default async function UsersPage() {
  // Fetch users using server components
  const users = await getAllUsers();

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
