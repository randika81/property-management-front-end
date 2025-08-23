import { motion } from 'framer-motion';
import { CheckCircle, Calendar, User, Bed, Mail, Phone, DollarSign, Download, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ConfirmationStepProps {
  data: any;
}

const ConfirmationStep = ({ data }: ConfirmationStepProps) => {
  const reservationNumber = 'RES-' + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Reservation Confirmed!</h2>
        <p className="text-slate-600 text-lg">Your booking has been successfully created</p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl inline-block">
          <p className="text-green-900 font-bold text-xl">Confirmation: {reservationNumber}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {/* Reservation Details */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Reservation Details
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Check-in Date:</span>
                <span className="font-medium">{new Date(data.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Check-out Date:</span>
                <span className="font-medium">{new Date(data.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Room Type:</span>
                <span className="font-medium">{data.roomType}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Guests:</span>
                <span className="font-medium">{data.guests}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-slate-200 pt-2">
                <span className="text-slate-600">Total Amount:</span>
                <span className="font-bold text-green-600 text-xl">
                  ${(data.total * 1.12).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Information */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Guest Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-slate-400" />
                <span className="font-medium">{data.guestName}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <span>{data.guestEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-slate-400" />
                <span>{data.guestPhone}</span>
              </div>
              {data.specialRequests && (
                <div className="mt-4">
                  <p className="text-slate-600 text-sm mb-1">Special Requests:</p>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-xl">{data.specialRequests}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button size="lg" className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 touch-manipulation">
          <Download className="w-5 h-5 mr-2" />
          Download Confirmation
        </Button>
        <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl touch-manipulation">
          <Send className="w-5 h-5 mr-2" />
          Email to Guest
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
        <h3 className="font-semibold text-blue-900 mb-3">Next Steps</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2 text-blue-800">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Confirmation email sent to guest</span>
          </li>
          <li className="flex items-center space-x-2 text-blue-800">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Room blocked in availability system</span>
          </li>
          <li className="flex items-center space-x-2 text-blue-800">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span>Payment authorization completed</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConfirmationStep;