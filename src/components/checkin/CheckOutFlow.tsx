import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Receipt, CreditCard, Printer, CheckCircle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CheckOutFlowProps {
  guest: any;
}

const CheckOutFlow = ({ guest }: CheckOutFlowProps) => {
  const [paymentSettled, setPaymentSettled] = useState(false);
  const [checkOutComplete, setCheckOutComplete] = useState(false);

  // Mock folio charges
  const folioCharges = [
    { date: '2025-01-20', description: 'Room Charge - Deluxe Room', amount: 180.00 },
    { date: '2025-01-21', description: 'Room Charge - Deluxe Room', amount: 180.00 },
    { date: '2025-01-21', description: 'Restaurant - Dinner', amount: 45.50 },
    { date: '2025-01-22', description: 'Mini Bar', amount: 20.00 },
    { date: '2025-01-22', description: 'Parking', amount: 15.00 }
  ];

  const subtotal = folioCharges.reduce((sum, charge) => sum + charge.amount, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;
  const preAuth = 150.00;
  const balance = Math.max(0, total - preAuth);

  const handleCompleteCheckOut = () => {
    setCheckOutComplete(true);
  };

  if (checkOutComplete) {
    return (
      <Card className="shadow-sm border-0">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <CheckCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Check-out Complete!</h3>
            <p className="text-slate-600 mb-6">Thank you for staying with us, {guest.name}</p>
            
            <div className="bg-amber-50 p-6 rounded-2xl mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-amber-700">Guest:</p>
                  <p className="font-semibold text-amber-900">{guest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700">Room:</p>
                  <p className="font-semibold text-amber-900">{guest.room}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700">Total Paid:</p>
                  <p className="font-semibold text-amber-900">${total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700">Status:</p>
                  <p className="font-semibold text-amber-900">Settled</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button size="lg" className="h-12 px-6 rounded-xl bg-amber-600 hover:bg-amber-700">
                <Printer className="w-5 h-5 mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-6 rounded-xl">
                Email Receipt
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
            <User className="w-6 h-6 mr-2 text-amber-600" />
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
            <p className="text-sm text-slate-600">Room: {guest.room}</p>
            <p className="text-sm text-slate-600">Check-in: {new Date(guest.checkIn).toLocaleDateString()}</p>
            <p className="text-sm text-slate-600">Check-out: {new Date(guest.checkOut).toLocaleDateString()}</p>
            <p className="text-sm text-slate-600">Nights: 3</p>
          </div>
        </CardContent>
      </Card>

      {/* Folio Summary */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="w-6 h-6 mr-2 text-amber-600" />
            Folio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {folioCharges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <div>
                    <p className="font-medium text-slate-900">{charge.description}</p>
                    <p className="text-sm text-slate-500">{new Date(charge.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-semibold text-slate-900">${charge.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax (12%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pre-authorization:</span>
                <span className="font-medium text-green-600">-${preAuth.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-slate-200 pt-2">
                <span className="font-semibold text-slate-900">Balance Due:</span>
                <span className={`font-bold text-xl ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settlement */}
      {balance > 0 && (
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-amber-600" />
              Payment Settlement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-red-900">Outstanding Balance</p>
                    <p className="text-sm text-red-700">Additional charges exceed pre-authorization</p>
                  </div>
                  <p className="text-2xl font-bold text-red-600">${balance.toFixed(2)}</p>
                </div>
              </div>

              <Button
                onClick={() => setPaymentSettled(true)}
                disabled={paymentSettled}
                className={`w-full h-12 rounded-xl ${paymentSettled ? 'bg-green-600 hover:bg-green-600' : 'bg-amber-600 hover:bg-amber-700'}`}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {paymentSettled ? 'Payment Settled' : 'Charge Additional Amount'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Check-out */}
      <Button
        onClick={handleCompleteCheckOut}
        disabled={balance > 0 && !paymentSettled}
        size="lg"
        className="w-full h-16 text-lg rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 touch-manipulation"
      >
        <CheckCircle className="w-6 h-6 mr-2" />
        Complete Check-out
      </Button>
    </div>
  );
};

export default CheckOutFlow;