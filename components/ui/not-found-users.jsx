'use client';

import { useEffect, useState } from 'react';
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
 * NotFoundUsers
 * A small UI component to show when "something is not found".
 * It fetches and displays all users in the system so admins can pick or inspect.
 *
 * Usage: <NotFoundUsers message="Ticket not found" />
 */
export default function NotFoundUsers({ message = 'No results found' }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load users');
        if (mounted) {
          setUsers(data.users || []);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        if (mounted) setError(err.message || 'Failed to load users');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">Loading users…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">{message}</p>
        <p className="text-sm text-muted-foreground mt-2">No users in the system.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h3 className="text-lg font-semibold mb-4">Other users in the system</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="w-20">{u.id}</TableCell>
              <TableCell>
                {u.firstName} {u.lastName}
              </TableCell>
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
