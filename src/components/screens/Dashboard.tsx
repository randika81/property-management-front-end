import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Home, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuickActions from '@/components/dashboard/QuickActions';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import OccupancyChart from '@/components/dashboard/OccupancyChart';

const Dashboard = () => {
  const kpis = [
    {
      title: 'Arrivals Today',
      value: '24',
      icon: UserPlus,
      color: 'text-green-600',
      bg: 'bg-green-50',
      change: '+12%'
    },
    {
      title: 'Departures',
      value: '18',
      icon: UserMinus,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      change: '+5%'
    },
    {
      title: 'In-house Guests',
      value: '187',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      change: '+8%'
    },
    {
      title: 'Occupancy Rate',
      value: '85%',
      icon: Home,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      change: '+3%'
    },
    {
      title: 'Out of Order',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      change: '-2'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 text-lg">Welcome back, John. Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2 text-slate-600">
          <Clock className="w-5 h-5" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-5 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${kpi.bg}`}>
                    <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                    <p className="text-sm text-green-600 font-medium">{kpi.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <QuickActions />
        </motion.div>

        {/* Occupancy Chart */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <OccupancyChart />
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ActivityFeed />
      </motion.div>
    </div>
  );
};

export default Dashboard;