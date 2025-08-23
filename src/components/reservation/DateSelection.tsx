import { Calendar, Users, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface DateSelectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const DateSelection = ({ data, onUpdate }: DateSelectionProps) => {
  const updateData = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const calculateNights = () => {
    if (data.checkIn && data.checkOut) {
      const checkIn = new Date(data.checkIn);
      const checkOut = new Date(data.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Select Dates & Guests</h2>
        <p className="text-slate-600">Choose your check-in and check-out dates</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="checkin" className="text-lg font-semibold">Check-in Date</Label>
          <input
            id="checkin"
            type="date"
            value={data.checkIn}
            onChange={(e) => updateData('checkIn', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="checkout" className="text-lg font-semibold">Check-out Date</Label>
          <input
            id="checkout"
            type="date"
            value={data.checkOut}
            onChange={(e) => updateData('checkOut', e.target.value)}
            min={data.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="guests" className="text-lg font-semibold">Number of Guests</Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <select
              id="guests"
              value={data.guests}
              onChange={(e) => updateData('guests', parseInt(e.target.value))}
              className="w-full pl-14 pr-4 py-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {calculateNights() > 0 && (
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Duration</Label>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-blue-900">
                  {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {data.checkIn && data.checkOut && (
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-4">Booking Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Check-in:</span>
              <span className="font-medium">{new Date(data.checkIn).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Check-out:</span>
              <span className="font-medium">{new Date(data.checkOut).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-medium">{data.guests}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total Nights:</span>
              <span>{calculateNights()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;