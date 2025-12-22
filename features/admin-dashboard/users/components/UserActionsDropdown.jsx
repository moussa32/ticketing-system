"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Key } from "lucide-react";

export default function UserActionsDropdown({ user, onEdit, onResetPassword }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onResetPassword(user)}>
          <Key className="w-4 h-4 mr-2" />
          Reset Password
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
