import { motion } from 'framer-motion';
import { UserPlus, LogIn, LogOut, Calendar, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: UserPlus,
      label: 'New Booking',
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/reservation'
    },
    {
      icon: LogIn,
      label: 'Check-in',
      color: 'bg-green-500 hover:bg-green-600',
      href: '/checkin'
    },
    {
      icon: LogOut,
      label: 'Check-out',
      color: 'bg-amber-500 hover:bg-amber-600',
      href: '/checkout'
    },
    {
      icon: Calendar,
      label: 'Availability',
      color: 'bg-purple-500 hover:bg-purple-600',
      href: '/availability'
    },
    {
      icon: Users,
      label: 'Guest Directory',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      href: '#'
    },
    {
      icon: Settings,
      label: 'Settings',
      color: 'bg-slate-500 hover:bg-slate-600',
      href: '#'
    }
  ];

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => action.href !== '#' && navigate(action.href)}
              className={`w-full ${action.color} text-white p-6 rounded-2xl text-lg font-medium touch-manipulation min-h-[64px] flex items-center justify-start space-x-4`}
              variant="default"
            >
              <action.icon className="w-6 h-6" />
              <span>{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;