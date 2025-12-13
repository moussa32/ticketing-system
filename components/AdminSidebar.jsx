'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Ticket, FolderOpen, Building2, UserCircle } from 'lucide-react';

const menuItems = [
  {
    name: 'Customers',
    href: '/dashboard/admin/customers',
    icon: UserCircle
  },
  {
    name: 'Users',
    href: '/dashboard/admin/users',
    icon: Users
  },
  {
    name: 'Tickets',
    href: '/dashboard/admin',
    icon: Ticket
  },
  {
    name: 'Categories',
    href: '/dashboard/admin/categories',
    icon: FolderOpen
  },
  {
    name: 'Departments',
    href: '/dashboard/admin/departments',
    icon: Building2
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
                ${isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-400 text-center">
          <p className="font-medium">Admin Dashboard</p>
          <p className="mt-0.5">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
