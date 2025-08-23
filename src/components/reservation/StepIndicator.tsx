import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <motion.div
            className={`relative flex items-center justify-center w-16 h-16 rounded-2xl ${
              step.number === currentStep
                ? 'bg-blue-600 text-white'
                : step.number < currentStep
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 text-slate-500'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {step.number < currentStep ? (
              <Check className="w-6 h-6" />
            ) : (
              <step.icon className="w-6 h-6" />
            )}
            
            {step.number === currentStep && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-4 border-blue-200"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>

          {/* Step Info */}
          <div className="ml-4">
            <p className="font-semibold text-slate-900">{step.title}</p>
            <p className="text-sm text-slate-500">Step {step.number}</p>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-8">
              <div className="h-1 bg-slate-200 rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: step.number < currentStep ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;