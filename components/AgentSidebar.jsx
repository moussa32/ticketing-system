'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Inbox, MessageCircle, User, Tag } from 'lucide-react';

const menuItems = [
  { name: 'My Tickets', href: '/dashboard/agent', icon: Inbox },
  { name: 'Assigned', href: '/dashboard/agent/assigned', icon: MessageCircle },
  { name: 'Customers', href: '/dashboard/agent/customers', icon: User },
  { name: 'Categories', href: '/dashboard/agent/categories', icon: Tag },
];

export default function AgentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white text-xs text-gray-400 text-center">
        <p className="font-medium">Agent Dashboard</p>
        <p className="mt-0.5">v1.0.0</p>
      </div>
    </aside>
  );
}
