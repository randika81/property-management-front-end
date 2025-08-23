import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoomFiltersProps {
  filters: {
    roomType: string;
    floor: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

const RoomFilters = ({ filters, onFiltersChange }: RoomFiltersProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-slate-600" />
        <span className="font-medium text-slate-700">Filters:</span>
      </div>

      <Select value={filters.roomType} onValueChange={(value) => updateFilter('roomType', value)}>
        <SelectTrigger className="w-[140px] h-12 rounded-xl text-base">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="deluxe">Deluxe</SelectItem>
          <SelectItem value="suite">Suite</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.floor} onValueChange={(value) => updateFilter('floor', value)}>
        <SelectTrigger className="w-[120px] h-12 rounded-xl text-base">
          <SelectValue placeholder="Floor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Floors</SelectItem>
          <SelectItem value="1">Floor 1</SelectItem>
          <SelectItem value="2">Floor 2</SelectItem>
          <SelectItem value="3">Floor 3</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
        <SelectTrigger className="w-[130px] h-12 rounded-xl text-base">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="clean">Clean</SelectItem>
          <SelectItem value="dirty">Dirty</SelectItem>
          <SelectItem value="inspected">Inspected</SelectItem>
          <SelectItem value="ooo">Out of Order</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={() => onFiltersChange({ roomType: 'all', floor: 'all', status: 'all' })} className="h-12 rounded-xl">
        Clear All
      </Button>
    </div>
  );
};

export default RoomFilters;