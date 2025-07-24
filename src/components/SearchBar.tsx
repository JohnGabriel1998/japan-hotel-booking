import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SearchFilters } from '../types/hotel';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  filters: SearchFilters;
}

export function SearchBar({ onSearch, filters }: SearchBarProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleSearch = () => {
    onSearch(localFilters);
  };

  const locations = [
    'Tokyo', 'Kyoto', 'Osaka', 'Hakone', 'Nara', 'Hiroshima', 'Kanazawa', 'Nikko'
  ];

  return (
    <Card className="p-6 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin size={16} />
            Destination
          </label>
          <select
            value={localFilters.location}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select destination</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar size={16} />
            Check-in
          </label>
          <Input
            type="date"
            value={localFilters.checkIn}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, checkIn: e.target.value }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar size={16} />
            Check-out
          </label>
          <Input
            type="date"
            value={localFilters.checkOut}
            min={localFilters.checkIn || new Date().toISOString().split('T')[0]}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, checkOut: e.target.value }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users size={16} />
            Guests
          </label>
          <select
            value={localFilters.guests}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleSearch}
          className="px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Search size={18} className="mr-2" />
          Search Hotels
        </Button>
      </div>
    </Card>
  );
}