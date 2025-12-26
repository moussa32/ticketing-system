'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UserActionsDropdown from './UserActionsDropdown';
import EditUserModal from './EditUserModal';

export default function UsersTable({ users = []  }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleResetPassword = async (user) => {
    if (confirm(`Reset password for ${user.first_name} ${user.last_name}?`)) {
      // TODO: Implement reset password logic
      alert('Password reset functionality will be implemented with server actions');
    }
  };
  
  
  const handleSaveUser = async (userId, formData) => {
    // TODO: Implement save user logic with server actions
    console.log('Saving user:', userId, formData);
    alert('Save user functionality will be implemented with server actions');
    /*if (onUserUpdate) {
      onUserUpdate();
    }*/
  };
  
  const getRoleBadge = (role) => {
    const roleColors = {
      'admin': 'bg-red-100 text-red-800 hover:bg-red-100/80',
      'agent': 'bg-blue-100 text-blue-800 hover:bg-blue-100/80',
      'customer': 'bg-gray-100 text-gray-800 hover:bg-gray-100/80'
    };
    
    return (
      <Badge className={`font-medium border-0 shadow-none ${roleColors[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };
  
  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Users Management</h2>
          <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="pl-6">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                    No users available
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.user_id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium text-sm">
                            {user.first_name}{user.last_name}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.Role.role_name)}</TableCell>
                    <TableCell>
                      <Badge className={`font-medium border shadow-none ${
                        user.status === "Active"
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-50/80' 
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50/80'
                      }`}>
                        {user.status === "Active" ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <UserActionsDropdown
                        user={user}
                        onEdit={handleEdit}
                        onResetPassword={handleResetPassword}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </>
  );
}
