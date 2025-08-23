import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OccupancyChart = () => {
  const occupancyData = [
    { day: 'Mon', occupied: 85, available: 15 },
    { day: 'Tue', occupied: 92, available: 8 },
    { day: 'Wed', occupied: 78, available: 22 },
    { day: 'Thu', occupied: 88, available: 12 },
    { day: 'Fri', occupied: 95, available: 5 },
    { day: 'Sat', occupied: 98, available: 2 },
    { day: 'Sun', occupied: 90, available: 10 }
  ];

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Occupancy Overview</CardTitle>
          <p className="text-slate-600">Weekly performance</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">+5.2%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {occupancyData.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 text-sm font-medium text-slate-600">{day.day}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-end pr-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${day.occupied}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  >
                    <span className="text-white text-xs font-medium">{day.occupied}%</span>
                  </motion.div>
                </div>
                <div className="text-sm font-medium text-slate-900 w-12">{day.occupied}%</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-slate-600">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <span className="text-sm text-slate-600">Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;