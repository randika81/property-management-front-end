import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, AlertTriangle, Wrench, Zap, Droplets, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
}

const ReportIssueModal = ({ isOpen, onClose, room }: ReportIssueModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const categories = [
    { id: 'electrical', label: 'Electrical', icon: Zap, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { id: 'hvac', label: 'HVAC', icon: Wind, color: 'bg-green-100 text-green-700 border-green-300' },
    { id: 'maintenance', label: 'General Maintenance', icon: Wrench, color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { id: 'other', label: 'Other', icon: AlertTriangle, color: 'bg-red-100 text-red-700 border-red-300' }
  ];

  const handleSubmit = () => {
    // In a real app, this would submit to backend
    console.log('Issue reported:', { room: room?.number, category: selectedCategory, description, photos });
    onClose();
    // Reset form
    setSelectedCategory('');
    setDescription('');
    setPhotos([]);
  };

  const handlePhotoCapture = () => {
    // Mock photo capture - in real app would use camera API
    const mockPhotoUrl = `https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400`;
    setPhotos([...photos, mockPhotoUrl]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Report Issue</h2>
                <p className="text-slate-600">Room {room?.number}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Issue Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 border-2 rounded-2xl transition-all touch-manipulation ${
                        selectedCategory === category.id
                          ? 'ring-2 ring-blue-500 ' + category.color
                          : category.color
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-6 h-6" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Description</h3>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] rounded-2xl text-lg touch-manipulation resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Photos</h3>
                <Button
                  variant="outline"
                  onClick={handlePhotoCapture}
                  className="w-full h-16 rounded-2xl border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 touch-manipulation"
                >
                  <Camera className="w-6 h-6 mr-3" />
                  Capture Photo
                </Button>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`Issue photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-4 p-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={onClose}
                size="lg"
                className="rounded-2xl px-6 touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedCategory || !description}
                size="lg"
                className="rounded-2xl px-6 bg-red-600 hover:bg-red-700 touch-manipulation"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Issue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportIssueModal;