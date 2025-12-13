import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

/**
 * UsersList
 * Server component that displays a list of users in a table.
 * Expects a `users` prop (array) provided from the server.
 *
 * Usage (server-side):
 * const users = await getUsers();
 * <UsersList users={users} />
 */
export default function UsersList({ users = [] }) {
  if (!users || users.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">No users available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-64">Email</TableHead>
            <TableHead className="w-32">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-mono text-xs">{u.id}</TableCell>
              <TableCell>{`${u.firstName || ''} ${u.lastName || ''}`.trim()}</TableCell>
              <TableCell className="truncate max-w-xs">{u.email}</TableCell>
              <TableCell className="capitalize">{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Showing {users.length} users</TableCaption>
      </Table>
    </div>
  );
}
