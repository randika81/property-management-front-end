import { motion } from 'framer-motion';
import { Clock, Check as CheckIn, Check as CheckOut, Bed, AlertTriangle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'checkin',
      icon: CheckIn,
      title: 'Guest Check-in',
      description: 'John Smith checked into Room 205',
      time: '5 minutes ago',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      id: 2,
      type: 'housekeeping',
      icon: Bed,
      title: 'Room Cleaned',
      description: 'Room 312 marked as clean by Maria',
      time: '12 minutes ago',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'checkout',
      icon: CheckOut,
      title: 'Guest Departure',
      description: 'Sarah Johnson checked out from Room 108',
      time: '25 minutes ago',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      id: 4,
      type: 'maintenance',
      icon: AlertTriangle,
      title: 'Maintenance Request',
      description: 'AC repair needed in Room 425',
      time: '45 minutes ago',
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      id: 5,
      type: 'booking',
      icon: User,
      title: 'New Reservation',
      description: 'Mike Davis booked Room 220 for tomorrow',
      time: '1 hour ago',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        <div className="flex items-center space-x-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Live updates</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className={`p-3 rounded-xl ${activity.bg}`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{activity.title}</p>
              <p className="text-slate-600">{activity.description}</p>
            </div>
            <div className="text-sm text-slate-500">{activity.time}</div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;