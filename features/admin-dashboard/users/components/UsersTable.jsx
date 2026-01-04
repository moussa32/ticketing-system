"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserActionsDropdown from "./UserActionsDropdown";
import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";
import { createUser, updateUser, deleteUser } from "../actions/userActions";

export default function UsersTable({ users, onUserUpdate }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleResetPassword = async (user) => {
    if (confirm(`Reset password for ${user.first_name} ${user.last_name}?`)) {
      // TODO: Implement reset password logic
      alert(
        "Password reset functionality will be implemented with server actions"
      );
    }
  };

  const handleLogoutUser = async (user) => {
    if (confirm(`Logout ${user.first_name} ${user.last_name}?`)) {
      // TODO: Implement logout user logic
      alert(
        "Logout user functionality will be implemented with server actions"
      );
    }
  };

  const handleLogoutAll = async (user) => {
    if (
      confirm(`Logout all sessions for ${user.first_name} ${user.last_name}?`)
    ) {
      // TODO: Implement logout all sessions logic
      alert(
        "Logout all sessions functionality will be implemented with server actions"
      );
    }
  };

  const handleSaveUser = async (userId, formData) => {
    const result = await updateUser(userId, formData);
    if (result.success && onUserUpdate) {
      onUserUpdate();
    }
    return result;
  };

  const handleCreateUser = async (formData) => {
    const result = await createUser(formData);
    if (result.success && onUserUpdate) {
      onUserUpdate();
    }
    return result;
  };

  const handleDelete = async (user) => {
    if (
      confirm(
        `Are you sure you want to delete ${user.first_name} ${user.last_name}? This action cannot be undone.`
      )
    ) {
      const result = await deleteUser(user.user_id);
      if (!result.success) {
        alert(result.message || "Failed to delete user");
      }
    }
  };

  const getRoleBadge = (roleId) => {
    const roleMap = {
      1: {
        name: "admin",
        color: "bg-red-100 text-red-800 hover:bg-red-100/80",
      },
      2: {
        name: "agent",
        color: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      },
      3: {
        name: "customer",
        color: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
      },
    };
    const role = roleMap[roleId] || {
      name: "unknown",
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={`font-medium border-0 shadow-none ${role.color}`}>
        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Users Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage user accounts and permissions
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create User
          </Button>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="pl-6">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No users available
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.user_id}
                    className="hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 font-medium text-sm">
                            {user.first_name?.[0]}
                            {user.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role_id)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`font-medium border shadow-none ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50/80"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50/80"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">-</TableCell>
                    <TableCell className="text-right pr-6">
                      <UserActionsDropdown
                        user={user}
                        onEdit={handleEdit}
                        onResetPassword={handleResetPassword}
                        onDelete={handleDelete}
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

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </>
  );
}
