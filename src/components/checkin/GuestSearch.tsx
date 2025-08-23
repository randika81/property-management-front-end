import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Users, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GuestSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGuestSelect: (guest: any) => void;
  type: 'checkin' | 'checkout';
}

const GuestSearch = ({ searchQuery, onSearchChange, onGuestSelect, type }: GuestSearchProps) => {
  // Mock data - in real app, this would come from an API
  const mockGuests = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      reservation: 'RES-ABC123',
      room: type === 'checkin' ? 'To be assigned' : '205',
      checkIn: '2025-01-20',
      checkOut: '2025-01-23',
      guests: 2,
      roomType: 'Deluxe Room',
      status: type === 'checkin' ? 'arriving' : 'in-house',
      balance: type === 'checkout' ? 245.50 : 0
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '(555) 987-6543',
      reservation: 'RES-DEF456',
      room: type === 'checkin' ? 'To be assigned' : '312',
      checkIn: '2025-01-20',
      checkOut: '2025-01-24',
      guests: 1,
      roomType: 'Standard Room',
      status: type === 'checkin' ? 'arriving' : 'in-house',
      balance: type === 'checkout' ? 0 : 0
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '(555) 456-7890',
      reservation: 'RES-GHI789',
      room: type === 'checkin' ? 'To be assigned' : '108',
      checkIn: '2025-01-19',
      checkOut: '2025-01-22',
      guests: 3,
      roomType: 'Suite',
      status: type === 'checkin' ? 'arriving' : 'in-house',
      balance: type === 'checkout' ? 89.25 : 0
    }
  ];

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.reservation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-sm border-0 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          {type === 'checkin' ? 'Arriving Today' : 'Departing Today'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search guests, reservation..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-all touch-manipulation"
              onClick={() => onGuestSelect(guest)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-slate-900">{guest.name}</h4>
                  <p className="text-sm text-slate-600">{guest.reservation}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">Room {guest.room}</p>
                  {type === 'checkout' && guest.balance > 0 && (
                    <p className="text-sm text-red-600 font-medium">${guest.balance}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(type === 'checkin' ? guest.checkIn : guest.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{guest.guests}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Bed className="w-3 h-3" />
                  <span>{guest.roomType}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGuests.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No guests found</p>
            <p className="text-sm text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestSearch;