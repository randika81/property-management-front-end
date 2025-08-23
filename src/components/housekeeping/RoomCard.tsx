import { motion } from 'framer-motion';
import { Bed, User, Clock, AlertTriangle, CheckCircle, Eye, Ban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RoomCardProps {
  room: any;
  onAction: (roomNumber: string, action: string) => void;
  onReportIssue: () => void;
}

const RoomCard = ({ room, onAction, onReportIssue }: RoomCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'bg-green-50 border-green-300';
      case 'dirty': return 'bg-gray-50 border-gray-300';
      case 'inspected': return 'bg-yellow-50 border-yellow-300';
      case 'ooo': return 'bg-red-50 border-red-300';
      default: return 'bg-slate-50 border-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'dirty': return <Bed className="w-5 h-5 text-gray-600" />;
      case 'inspected': return <Eye className="w-5 h-5 text-yellow-600" />;
      case 'ooo': return <Ban className="w-5 h-5 text-red-600" />;
      default: return <Bed className="w-5 h-5 text-slate-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const getSwipeActions = () => {
    switch (room.status) {
      case 'dirty':
        return [
          { label: 'Clean', action: 'clean', color: 'bg-green-600' },
          { label: 'Issue', action: 'report', color: 'bg-red-600' }
        ];
      case 'clean':
        return [
          { label: 'Inspect', action: 'inspect', color: 'bg-yellow-600' },
          { label: 'Issue', action: 'report', color: 'bg-red-600' }
        ];
      case 'inspected':
        return [
          { label: 'Ready', action: 'ready', color: 'bg-blue-600' },
          { label: 'Reclean', action: 'reclean', color: 'bg-orange-600' }
        ];
      case 'ooo':
        return [
          { label: 'Fixed', action: 'fixed', color: 'bg-green-600' }
        ];
      default:
        return [];
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'report') {
      onReportIssue();
    } else {
      onAction(room.number, action);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`shadow-sm border-2 transition-all ${getStatusColor(room.status)} touch-manipulation`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-slate-900">
                {room.number}
              </div>
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(room.priority)}`}></div>
            </div>
            <div className="flex items-center space-x-1">
              {getStatusIcon(room.status)}
              <span className="text-sm font-medium text-slate-700 capitalize">
                {room.status === 'ooo' ? 'OOO' : room.status}
              </span>
            </div>
          </div>

          {/* Room Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Type:</span>
              <span className="font-medium">{room.type}</span>
            </div>
            
            {room.assignedTo && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Assigned:</span>
                <span className="font-medium">{room.assignedTo}</span>
              </div>
            )}

            {room.guestCheckOut && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Check-out:</span>
                <span className="font-medium">{room.guestCheckOut}</span>
              </div>
            )}

            {room.nextGuest && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Next guest:</span>
                <span className="font-medium text-orange-600">{room.nextGuest}</span>
              </div>
            )}

            {room.lastCleaned && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Last cleaned:</span>
                <span className="font-medium text-green-600">{room.lastCleaned}</span>
              </div>
            )}
          </div>

          {/* Issues */}
          {room.issues.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Issues:</span>
              </div>
              <ul className="text-sm text-red-800">
                {room.issues.map((issue: string, index: number) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {getSwipeActions().map((action) => (
              <Button
                key={action.action}
                onClick={() => handleActionClick(action.action)}
                size="sm"
                className={`flex-1 ${action.color} hover:opacity-90 text-white rounded-xl touch-manipulation min-h-[44px]`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomCard;