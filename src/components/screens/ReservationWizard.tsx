import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Calendar, Users, CreditCard, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/reservation/StepIndicator';
import DateSelection from '@/components/reservation/DateSelection';
import GuestDetails from '@/components/reservation/GuestDetails';
import RoomSelection from '@/components/reservation/RoomSelection';
import PaymentDetails from '@/components/reservation/PaymentDetails';
import ConfirmationStep from '@/components/reservation/ConfirmationStep';

const ReservationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reservationData, setReservationData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    rateCode: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    paymentMethod: '',
    cardNumber: '',
    total: 0
  });

  const steps = [
    { number: 1, title: 'Dates & Guests', icon: Calendar },
    { number: 2, title: 'Room Selection', icon: Users },
    { number: 3, title: 'Guest Details', icon: Users },
    { number: 4, title: 'Payment', icon: CreditCard },
    { number: 5, title: 'Confirmation', icon: Check }
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DateSelection data={reservationData} onUpdate={setReservationData} />;
      case 2:
        return <RoomSelection data={reservationData} onUpdate={setReservationData} />;
      case 3:
        return <GuestDetails data={reservationData} onUpdate={setReservationData} />;
      case 4:
        return <PaymentDetails data={reservationData} onUpdate={setReservationData} />;
      case 5:
        return <ConfirmationStep data={reservationData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-2">New Reservation</h1>
        <p className="text-slate-600 text-lg">Create a new booking for your guest</p>
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StepIndicator steps={steps} currentStep={currentStep} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-sm border-0">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 h-14 px-8 rounded-2xl touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </Button>

        <div className="text-slate-500 text-lg">
          Step {currentStep} of {steps.length}
        </div>

        <Button
          size="lg"
          onClick={nextStep}
          disabled={currentStep === 5}
          className="flex items-center space-x-2 h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 touch-manipulation"
        >
          <span>{currentStep === 5 ? 'Complete' : 'Next'}</span>
          {currentStep === 5 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </Button>
      </motion.div>
    </div>
  );
};

export default ReservationWizard;