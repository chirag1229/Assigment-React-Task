import React from 'react';
import { Truck, Package, Users, User, Settings, LogOut, MessageSquare } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: Truck, label: 'Bid', active: true },
    { icon: Package, label: 'POD' },
    { icon: Users, label: 'Vendor' },
    { icon: User, label: 'User' },
    { icon: Settings, label: 'Settings' },
    { icon: MessageSquare, label: 'Contact Us' },
    { icon: LogOut, label: 'Logout' },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
        <span className="font-semibold">LOGO</span>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-4 px-6 py-3 hover:bg-gray-100 ${
              item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    
    </aside>
  );
  
}

export default Sidebar;