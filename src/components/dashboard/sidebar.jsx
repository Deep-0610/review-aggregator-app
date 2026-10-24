import Link from 'next/link';
import { LayoutDashboard, MessageSquare, Send, Settings, Star } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Reviews Inbox', href: '/reviews', icon: Star },
  { name: 'SMS Campaigns', href: '/sms-campaigns', icon: Send },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 px-2 py-4 border-b border-slate-800 mb-6">
          <MessageSquare className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-lg">ReputeFlow</span>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-2 py-4 border-t border-slate-800 text-xs text-slate-500">
        Free Prototype Tier
      </div>
    </aside>
  );
}