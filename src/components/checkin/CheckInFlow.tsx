import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, CreditCard, Printer, CheckCircle, Bed, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CheckInFlowProps {
  guest: any;
}

const CheckInFlow = ({ guest }: CheckInFlowProps) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [cardPreAuth, setCardPreAuth] = useState(false);
  const [keysAssigned, setKeysAssigned] = useState(false);
  const [checkInComplete, setCheckInComplete] = useState(false);

  const availableRooms = [
    { number: '205', type: 'Deluxe Room', floor: 2, status: 'clean' },
    { number: '207', type: 'Deluxe Room', floor: 2, status: 'clean' },
    { number: '308', type: 'Deluxe Room', floor: 3, status: 'clean' },
    { number: '312', type: 'Deluxe Room', floor: 3, status: 'clean' }
  ];

  const handleCompleteCheckIn = () => {
    setCheckInComplete(true);
    // In a real app, this would update the backend
  };

  if (checkInComplete) {
    return (
      <Card className="shadow-sm border-0">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Check-in Complete!</h3>
            <p className="text-slate-600 mb-6">Welcome {guest.name} to Grand Plaza Hotel</p>
            
            <div className="bg-green-50 p-6 rounded-2xl mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-green-700">Guest:</p>
                  <p className="font-semibold text-green-900">{guest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700">Room:</p>
                  <p className="font-semibold text-green-900">{selectedRoom}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700">Check-out:</p>
                  <p className="font-semibold text-green-900">{new Date(guest.checkOut).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-green-700">Keys:</p>
                  <p className="font-semibold text-green-900">2 Cards Assigned</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button size="lg" className="h-12 px-6 rounded-xl bg-green-600 hover:bg-green-700">
                <Printer className="w-5 h-5 mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-6 rounded-xl">
                New Check-in
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Guest Information */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg text-slate-900">{guest.name}</h4>
            <p className="text-slate-600">{guest.email}</p>
            <p className="text-slate-600">{guest.phone}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Reservation: {guest.reservation}</p>
            <p className="text-sm text-slate-600">Check-out: {new Date(guest.checkOut).toLocaleDateString()}</p>
            <p className="text-sm text-slate-600">Guests: {guest.guests}</p>
            <p className="text-sm text-slate-600">Room Type: {guest.roomType}</p>
          </div>
        </CardContent>
      </Card>

      {/* Room Assignment */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bed className="w-6 h-6 mr-2 text-blue-600" />
            Room Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Room
                </label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Choose available room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms.map((room) => (
                      <SelectItem key={room.number} value={room.number}>
                        <div className="flex items-center justify-between w-full">
                          <span>Room {room.number}</span>
                          <div className="flex items-center space-x-2 ml-4">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-500">Floor {room.floor}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Keys
                </label>
                <Select defaultValue="2">
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Key</SelectItem>
                    <SelectItem value="2">2 Keys</SelectItem>
                    <SelectItem value="3">3 Keys</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedRoom && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900">Room {selectedRoom} Selected</p>
                    <p className="text-sm text-blue-700">
                      {availableRooms.find(r => r.number === selectedRoom)?.type} - Floor {availableRooms.find(r => r.number === selectedRoom)?.floor}
                    </p>
                  </div>
                  <Button
                    onClick={() => setKeysAssigned(true)}
                    disabled={keysAssigned}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    {keysAssigned ? 'Keys Assigned' : 'Assign Keys'}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Authorization */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
            Payment Authorization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600">Authorization Amount</p>
                <p className="text-2xl font-bold text-slate-900">$150.00</p>
                <p className="text-sm text-slate-500">Includes incidentals hold</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Card on File</p>
                <p className="font-medium text-slate-900">**** **** **** 4567</p>
                <p className="text-sm text-slate-500">Expires 12/26</p>
              </div>
            </div>

            <Button
              onClick={() => setCardPreAuth(true)}
              disabled={cardPreAuth}
              className={`w-full h-12 rounded-xl ${cardPreAuth ? 'bg-green-600 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {cardPreAuth ? 'Authorization Complete' : 'Authorize Payment'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complete Check-in */}
      <Button
        onClick={handleCompleteCheckIn}
        disabled={!selectedRoom || !keysAssigned || !cardPreAuth}
        size="lg"
        className="w-full h-16 text-lg rounded-2xl bg-green-600 hover:bg-green-700 disabled:bg-slate-300 touch-manipulation"
      >
        <CheckCircle className="w-6 h-6 mr-2" />
        Complete Check-in
      </Button>
    </div>
  );
};

export default CheckInFlow;