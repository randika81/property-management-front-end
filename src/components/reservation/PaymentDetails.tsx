import { CreditCard, Shield, DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface PaymentDetailsProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PaymentDetails = ({ data, onUpdate }: PaymentDetailsProps) => {
  const updateData = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const taxAmount = data.total * 0.12;
  const grandTotal = data.total + taxAmount;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CreditCard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900">Payment Details</h2>
        <p className="text-slate-600">Secure your reservation with payment information</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Payment Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="paymentMethod" className="text-lg font-semibold">Payment Method</Label>
            <select
              id="paymentMethod"
              value={data.paymentMethod}
              onChange={(e) => updateData('paymentMethod', e.target.value)}
              className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select payment method</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          {(data.paymentMethod === 'credit' || data.paymentMethod === 'debit') && (
            <>
              <div className="space-y-4">
                <Label htmlFor="cardNumber" className="text-lg font-semibold">Card Number</Label>
                <input
                  id="cardNumber"
                  type="text"
                  value={data.cardNumber}
                  onChange={(e) => updateData('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label htmlFor="expiry" className="text-lg font-semibold">Expiry Date</Label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="cvv" className="text-lg font-semibold">CVV</Label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full p-4 border border-slate-300 rounded-2xl text-lg touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
            <Shield className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Secure Payment</p>
              <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Price Breakdown
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Room Rate</span>
                <span className="font-medium">${data.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Taxes & Fees (12%)</span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-300 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-slate-900">Total Amount</span>
                  <span className="text-xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Reservation Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Guest:</span>
                <span className="font-medium text-blue-900">{data.guestName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Check-in:</span>
                <span className="font-medium text-blue-900">
                  {data.checkIn ? new Date(data.checkIn).toLocaleDateString() : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Check-out:</span>
                <span className="font-medium text-blue-900">
                  {data.checkOut ? new Date(data.checkOut).toLocaleDateString() : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Room:</span>
                <span className="font-medium text-blue-900">{data.roomType || 'Not selected'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;