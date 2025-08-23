import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Bed,
  Hotel
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'Availability', href: '/availability' },
  { icon: UserPlus, label: 'New Booking', href: '/reservation' },
  { icon: LogIn, label: 'Check-in', href: '/checkin' },
  { icon: LogOut, label: 'Check-out', href: '/checkout' },
  { icon: Bed, label: 'Housekeeping', href: '/housekeeping' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.div
      className="w-80 bg-slate-900 text-white flex flex-col shadow-xl"
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-3 rounded-2xl">
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">HotelPro PMS</h2>
            <p className="text-slate-400 text-sm">Property Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard' && location.pathname === '/');
          
          return (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={cn(
                  "flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 touch-manipulation min-h-[60px]",
                  isActive 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium text-lg">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold">JD</span>
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-slate-400 text-sm">Front Desk Manager</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;