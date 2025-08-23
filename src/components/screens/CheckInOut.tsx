import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX, Key, CreditCard, Receipt, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GuestSearch from '@/components/checkin/GuestSearch';
import CheckInFlow from '@/components/checkin/CheckInFlow';
import CheckOutFlow from '@/components/checkin/CheckOutFlow';

interface CheckInOutProps {
  type: 'checkin' | 'checkout';
}

const CheckInOut = ({ type }: CheckInOutProps) => {
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const isCheckIn = type === 'checkin';

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
            {isCheckIn ? (
              <>
                <UserCheck className="w-8 h-8 mr-3 text-green-600" />
                Check-in
              </>
            ) : (
              <>
                <UserX className="w-8 h-8 mr-3 text-amber-600" />
                Check-out
              </>
            )}
          </h1>
          <p className="text-slate-600 text-lg">
            {isCheckIn 
              ? 'Welcome arriving guests and assign rooms' 
              : 'Process guest departures and settle accounts'
            }
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-2xl ${isCheckIn ? 'bg-green-50' : 'bg-amber-50'}`}>
            {isCheckIn ? (
              <Key className={`w-8 h-8 ${isCheckIn ? 'text-green-600' : 'text-amber-600'}`} />
            ) : (
              <Receipt className={`w-8 h-8 ${isCheckIn ? 'text-green-600' : 'text-amber-600'}`} />
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Guest Search */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GuestSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onGuestSelect={setSelectedGuest}
            type={type}
          />
        </motion.div>

        {/* Main Flow */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {selectedGuest ? (
            isCheckIn ? (
              <CheckInFlow guest={selectedGuest} />
            ) : (
              <CheckOutFlow guest={selectedGuest} />
            )
          ) : (
            <Card className="shadow-sm border-0 h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Select a Guest
                </h3>
                <p className="text-slate-600">
                  {isCheckIn 
                    ? 'Search and select an arriving guest to begin check-in process'
                    : 'Search and select a guest to process checkout'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckInOut;