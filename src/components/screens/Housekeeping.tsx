import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Filter, CheckCircle, AlertTriangle, Camera, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RoomCard from '@/components/housekeeping/RoomCard';
import ReportIssueModal from '@/components/housekeeping/ReportIssueModal';

const Housekeeping = () => {
  const [filter, setFilter] = useState('all');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Mock room data
  const rooms = [
    {
      number: '101',
      type: 'Standard',
      status: 'dirty',
      priority: 'high',
      guestCheckOut: '11:00 AM',
      nextGuest: '3:00 PM',
      assignedTo: 'Maria',
      lastCleaned: null,
      issues: []
    },
    {
      number: '102',
      type: 'Standard',
      status: 'clean',
      priority: 'normal',
      guestCheckOut: '10:30 AM',
      nextGuest: null,
      assignedTo: 'Maria',
      lastCleaned: '12:45 PM',
      issues: []
    },
    {
      number: '103',
      type: 'Deluxe',
      status: 'inspected',
      priority: 'normal',
      guestCheckOut: '9:00 AM',
      nextGuest: '4:00 PM',
      assignedTo: 'Carlos',
      lastCleaned: '1:30 PM',
      issues: []
    },
    {
      number: '201',
      type: 'Suite',
      status: 'ooo',
      priority: 'urgent',
      guestCheckOut: null,
      nextGuest: null,
      assignedTo: null,
      lastCleaned: null,
      issues: ['AC not working', 'Bathroom leak']
    },
    {
      number: '202',
      type: 'Suite',
      status: 'dirty',
      priority: 'high',
      guestCheckOut: '11:30 AM',
      nextGuest: '2:00 PM',
      assignedTo: 'Ana',
      lastCleaned: null,
      issues: []
    },
    {
      number: '203',
      type: 'Deluxe',
      status: 'clean',
      priority: 'low',
      guestCheckOut: '10:00 AM',
      nextGuest: 'Tomorrow',
      assignedTo: 'Ana',
      lastCleaned: '2:15 PM',
      issues: []
    }
  ];

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true;
    return room.status === filter;
  });

  const statusCounts = {
    dirty: rooms.filter(r => r.status === 'dirty').length,
    clean: rooms.filter(r => r.status === 'clean').length,
    inspected: rooms.filter(r => r.status === 'inspected').length,
    ooo: rooms.filter(r => r.status === 'ooo').length
  };

  const handleRoomAction = (roomNumber: string, action: string) => {
    // In a real app, this would update the backend
    console.log(`${action} performed on room ${roomNumber}`);
  };

  const handleReportIssue = (room: any) => {
    setSelectedRoom(room);
    setReportModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Bed className="w-8 h-8 mr-3 text-blue-600" />
            Housekeeping
          </h1>
          <p className="text-slate-600 text-lg">Manage room status and maintenance</p>
        </div>

        <div className="flex items-center space-x-2 text-slate-600">
          <Clock className="w-5 h-5" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {/* Status Overview */}
      <motion.div
        className="grid grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { status: 'dirty', label: 'Dirty', count: statusCounts.dirty, color: 'bg-gray-100 border-gray-300 text-gray-700' },
          { status: 'clean', label: 'Clean', count: statusCounts.clean, color: 'bg-green-100 border-green-300 text-green-700' },
          { status: 'inspected', label: 'Inspected', count: statusCounts.inspected, color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
          { status: 'ooo', label: 'Out of Order', count: statusCounts.ooo, color: 'bg-red-100 border-red-300 text-red-700' }
        ].map((item) => (
          <motion.button
            key={item.status}
            onClick={() => setFilter(filter === item.status ? 'all' : item.status)}
            className={`p-6 rounded-2xl border-2 transition-all touch-manipulation ${
              filter === item.status ? 'ring-2 ring-blue-500' : ''
            } ${item.color}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{item.count}</p>
              <p className="font-semibold">{item.label}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <span className="font-medium text-slate-700">Filter by status:</span>
          <div className="flex space-x-2">
            {['all', 'dirty', 'clean', 'inspected', 'ooo'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all touch-manipulation ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </div>
      </motion.div>

      {/* Room Cards */}
      <motion.div
        className="grid grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RoomCard
              room={room}
              onAction={handleRoomAction}
              onReportIssue={() => handleReportIssue(room)}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredRooms.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Bed className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No Rooms Found</h3>
          <p className="text-slate-600">Try adjusting your filter criteria</p>
        </motion.div>
      )}

      {/* Report Issue Modal */}
      <ReportIssueModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
};

export default Housekeeping;