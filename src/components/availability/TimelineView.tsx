import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { User, Bed } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimelineViewProps {
  selectedDate: Date;
  zoomLevel: number;
  filters: {
    roomType: string;
    floor: string;
    status: string;
  };
}

const TimelineView = ({ selectedDate, zoomLevel, filters }: TimelineViewProps) => {
  const [draggedReservation, setDraggedReservation] = useState<number | null>(null);
  
  // Sample data
  const rooms = [
    { number: '101', type: 'Standard', floor: 1, status: 'clean' },
    { number: '102', type: 'Standard', floor: 1, status: 'dirty' },
    { number: '103', type: 'Deluxe', floor: 1, status: 'inspected' },
    { number: '201', type: 'Suite', floor: 2, status: 'clean' },
    { number: '202', type: 'Suite', floor: 2, status: 'ooo' },
    { number: '203', type: 'Deluxe', floor: 2, status: 'clean' },
  ];

  const reservations = [
    {
      id: 1,
      roomNumber: '101',
      guest: 'John Smith',
      checkIn: '2025-01-20',
      checkOut: '2025-01-23',
      nights: 3,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      roomNumber: '103',
      guest: 'Sarah Wilson',
      checkIn: '2025-01-21',
      checkOut: '2025-01-24',
      nights: 3,
      color: 'bg-green-500'
    },
    {
      id: 3,
      roomNumber: '201',
      guest: 'Mike Johnson',
      checkIn: '2025-01-19',
      checkOut: '2025-01-22',
      nights: 3,
      color: 'bg-purple-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'bg-green-100 border-green-300';
      case 'dirty': return 'bg-gray-100 border-gray-300';
      case 'inspected': return 'bg-yellow-100 border-yellow-300';
      case 'ooo': return 'bg-red-100 border-red-300';
      default: return 'bg-slate-100 border-slate-300';
    }
  };

  // Generate dates for timeline
  const generateDates = () => {
    const dates = [];
    for (let i = -3; i <= 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const dragControls = useDragControls();

  return (
    <Card className="overflow-auto shadow-sm border-0" style={{ height: '600px' }}>
      <div className="p-6">
        <div className="flex">
          {/* Room List */}
          <div className="w-48 flex-shrink-0">
            <div className="h-16 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl mb-2">
              <span className="font-semibold text-slate-700">Rooms</span>
            </div>
            {rooms.map((room) => (
              <motion.div
                key={room.number}
                className={`h-20 p-4 border rounded-xl mb-2 ${getStatusColor(room.status)}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{room.number}</p>
                    <p className="text-sm text-slate-600">{room.type}</p>
                  </div>
                  <Bed className="w-5 h-5 text-slate-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Grid */}
          <div className="flex-1 ml-4" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}>
            {/* Date Headers */}
            <div className="flex mb-2">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className="flex-1 h-16 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl mr-1 min-w-[120px]"
                >
                  <div className="text-center">
                    <p className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-sm text-slate-600">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Rows */}
            {rooms.map((room) => (
              <div key={room.number} className="flex mb-2 relative">
                {dates.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    className="flex-1 h-20 border border-slate-200 rounded-xl mr-1 bg-white min-w-[120px] relative"
                  >
                    {/* Render reservations */}
                    {reservations
                      .filter((res) => res.roomNumber === room.number)
                      .map((reservation) => {
                        const checkIn = new Date(reservation.checkIn);
                        const checkOut = new Date(reservation.checkOut);
                        
                        if (date >= checkIn && date < checkOut) {
                          const isStart = date.toDateString() === checkIn.toDateString();
                          
                          return isStart ? (
                            <motion.div
                              key={reservation.id}
                              className={`absolute inset-1 ${reservation.color} text-white p-2 rounded-xl cursor-grab shadow-lg`}
                              style={{
                                width: `${reservation.nights * 121}px`,
                                zIndex: draggedReservation === reservation.id ? 10 : 1
                              }}
                              drag
                              dragControls={dragControls}
                              dragConstraints={{ left: 0, right: 0, top: -100, bottom: 100 }}
                              onDragStart={() => setDraggedReservation(reservation.id)}
                              onDragEnd={() => setDraggedReservation(null)}
                              whileDrag={{ scale: 1.02, rotate: 2 }}
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{reservation.guest}</p>
                                  <p className="text-xs opacity-80">{reservation.nights} nights</p>
                                </div>
                              </div>
                            </motion.div>
                          ) : null;
                        }
                        
                        return null;
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimelineView;