'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Key, LogOut, ShieldAlert } from 'lucide-react';

export default function UserActionsDropdown({ user, onEdit, onResetPassword, onLogoutUser, onLogoutAll }) {
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
        <DropdownMenuItem 
          onClick={() => onLogoutUser(user)}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout User
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLogoutAll(user)}
          className="text-destructive focus:text-destructive"
        >
          <ShieldAlert className="w-4 h-4 mr-2" />
          Logout All Sessions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

