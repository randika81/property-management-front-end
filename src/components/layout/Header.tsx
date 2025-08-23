import { Bell, Search, Wifi, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.header
      className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reservations, guests..."
            className="pl-10 pr-4 py-3 bg-slate-100 rounded-2xl w-80 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all touch-manipulation"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-lg font-semibold text-slate-900">{currentTime}</p>
          <p className="text-slate-500">Grand Plaza Hotel</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            className="relative p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </motion.button>
          
          <div className="flex items-center space-x-2 text-slate-600">
            <Wifi className="w-5 h-5" />
            <Battery className="w-5 h-5" />
            <span className="text-sm font-medium">100%</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;