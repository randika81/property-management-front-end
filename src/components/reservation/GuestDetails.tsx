import { Users, Mail, Phone, Camera, MessageSquare } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface GuestDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
}

const GuestDetails = ({ data, onUpdate }: GuestDetailsProps) => {
  const updateData = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Guest Information</h2>
        <p className="text-slate-600">Please provide the guest details</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label htmlFor="guestName" className="text-lg font-semibold">Full Name *</Label>
          <input
            id="guestName"
            type="text"
            value={data.guestName}
            onChange={(e) => updateData('guestName', e.target.value)}
            placeholder="Enter guest's full name"
            className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="guestEmail" className="text-lg font-semibold">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input
              id="guestEmail"
              type="email"
              value={data.guestEmail}
              onChange={(e) => updateData('guestEmail', e.target.value)}
              placeholder="guest@example.com"
              className="w-full pl-14 pr-4 py-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="guestPhone" className="text-lg font-semibold">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input
              id="guestPhone"
              type="tel"
              value={data.guestPhone}
              onChange={(e) => updateData('guestPhone', e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full pl-14 pr-4 py-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">ID Verification</Label>
          <Button
            variant="outline"
            size="lg"
            className="w-full h-16 rounded-2xl text-lg border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 touch-manipulation"
          >
            <Camera className="w-6 h-6 mr-3" />
            Capture ID Document
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="specialRequests" className="text-lg font-semibold">Special Requests</Label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 text-slate-400 w-6 h-6" />
          <Textarea
            id="specialRequests"
            value={data.specialRequests}
            onChange={(e) => updateData('specialRequests', e.target.value)}
            placeholder="Any special requirements or preferences..."
            className="w-full pl-14 pr-4 py-4 border border-slate-300 rounded-2xl text-lg min-h-[120px] touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-sm text-slate-600">Room Type</p>
          <p className="font-semibold text-slate-900">{data.roomType || 'Not selected'}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-sm text-slate-600">Duration</p>
          <p className="font-semibold text-slate-900">
            {data.checkIn && data.checkOut ? 
              Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24)) + ' nights'
              : 'Not selected'
            }
          </p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl">
          <p className="text-sm text-slate-600">Guests</p>
          <p className="font-semibold text-slate-900">{data.guests} guest{data.guests > 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;