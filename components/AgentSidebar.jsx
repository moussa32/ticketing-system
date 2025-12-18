'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ticket, MessageSquare, BarChart3, UserCircle } from 'lucide-react';

const menuItems = [
  {
    name: 'Tickets',
    href: '/dashboard/agent/v2',
    icon: Ticket
  },
  {
    name: 'Messages',
    href: '/dashboard/agent/messages',
    icon: MessageSquare
  },
  {
    name: 'Analytics',
    href: '/dashboard/agent/analytics',
    icon: BarChart3
  },
  {
    name: 'Profile',
    href: '/dashboard/agent/profile',
    icon: UserCircle
  }
];

export default function AgentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-900 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-400 text-center">
          <p className="font-medium">Agent Dashboard</p>
          <p className="mt-0.5">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
