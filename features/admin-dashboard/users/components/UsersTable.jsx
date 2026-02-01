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
import AddUserModal from "./AddUserModal";
import { createUser, updateUser } from "../actions/userActions";
import { useRouter } from "next/navigation";

export default function UsersTable({ users = [], roles = [] }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const router = useRouter();

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleAddUser = async (formData) => {
    const result = await createUser(formData);
    if (result.success) {
      router.refresh(); // Refresh to show new user
    }
    return result;
  };

  const handleSaveUser = async (userId, formData) => {
    const result = await updateUser(userId, formData);
    if (result.success) {
      router.refresh();
    }
    return result;
  };

  const getRoleBadge = (roleName) => {
    if (!roleName) return null;
    const roleColors = {
      admin: "bg-red-100 text-red-800 hover:bg-red-100/80",
      agent: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
      customer: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
    };

    const colorClass =
      roleColors[roleName.toLowerCase()] ||
      "bg-gray-100 text-gray-800 hover:bg-gray-100/80";

    return (
      <Badge className={`font-medium border-0 shadow-none ${colorClass}`}>
        {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Users Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage user accounts and permissions
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
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
                  <TableCell
                    colSpan={4}
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
                    <TableCell>
                      {user.Role ? getRoleBadge(user.Role.role_name) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`font-medium border shadow-none ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50/80"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50/80"
                        }`}
                      >
                        {user.status === "Active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <UserActionsDropdown user={user} onEdit={handleEdit} />
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

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
        roles={roles}
      />
    </>
  );
}
