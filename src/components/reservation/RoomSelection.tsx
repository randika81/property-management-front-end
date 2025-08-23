import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Users, Wifi, Car, Coffee, Bath } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RoomSelectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const RoomSelection = ({ data, onUpdate }: RoomSelectionProps) => {
  const [selectedRoom, setSelectedRoom] = useState(data.roomType || '');

  const rooms = [
    {
      type: 'Standard Room',
      price: 120,
      capacity: 2,
      amenities: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'TV'],
      icons: [Wifi, Bath],
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      type: 'Deluxe Room',
      price: 180,
      capacity: 3,
      amenities: ['Free WiFi', 'Mini Bar', 'Room Service', 'Balcony', 'Premium TV'],
      icons: [Wifi, Coffee, Bath],
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      type: 'Executive Suite',
      price: 320,
      capacity: 4,
      amenities: ['Free WiFi', 'Living Area', 'Kitchenette', 'Concierge Service'],
      icons: [Wifi, Coffee, Car, Bath],
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const selectRoom = (roomType: string, price: number) => {
    setSelectedRoom(roomType);
    onUpdate({ 
      ...data, 
      roomType, 
      total: price * (data.checkOut && data.checkIn ? 
        Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1)
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Bed className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Choose Your Room</h2>
        <p className="text-slate-600">Select the perfect accommodation for your stay</p>
      </div>

      <div className="grid gap-6">
        {rooms.map((room, index) => (
          <motion.div
            key={room.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg touch-manipulation ${
                selectedRoom === room.type
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => selectRoom(room.type, room.price)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-32 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">{room.type}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${room.price}</p>
                        <p className="text-sm text-slate-500">per night</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Up to {room.capacity} guests</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {room.icons.map((Icon, iconIndex) => (
                      <div key={iconIndex} className="p-2 bg-slate-100 rounded-lg">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedRoom && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-blue-50 border border-blue-200 rounded-2xl"
        >
          <h3 className="font-semibold text-blue-900 mb-2">Selected Room</h3>
          <div className="flex justify-between items-center">
            <span className="text-blue-800">{selectedRoom}</span>
            <span className="text-xl font-bold text-blue-900">
              Total: ${data.total || 0}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RoomSelection;