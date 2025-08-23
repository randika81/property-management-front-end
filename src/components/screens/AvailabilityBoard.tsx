import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, ZoomIn, ZoomOut, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TimelineView from '@/components/availability/TimelineView';
import RoomFilters from '@/components/availability/RoomFilters';

const AvailabilityBoard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filters, setFilters] = useState({
    roomType: 'all',
    floor: 'all',
    status: 'all'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Availability Board</h1>
          <p className="text-slate-600 text-lg">Manage room reservations and availability</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            className="touch-manipulation"
          >
            <ZoomOut className="w-5 h-5 mr-2" />
            Zoom Out
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
            className="touch-manipulation"
          >
            <ZoomIn className="w-5 h-5 mr-2" />
            Zoom In
          </Button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border-0"
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-slate-600" />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-4 py-2 border border-slate-200 rounded-xl text-lg touch-manipulation"
            />
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl w-64 text-lg touch-manipulation"
            />
          </div>
        </div>

        <RoomFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Timeline View */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TimelineView 
          selectedDate={selectedDate}
          zoomLevel={zoomLevel}
          filters={filters}
        />
      </motion.div>
    </div>
  );
};

export default AvailabilityBoard;