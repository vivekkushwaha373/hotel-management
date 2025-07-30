import React from 'react';
import { Destination } from '../types';

interface DestinationSelectorProps {
  destinations: Destination[];
  selectedDestination: string;
  onDestinationChange: (destinationId: string) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  destinations,
  selectedDestination,
  onDestinationChange,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
        Select Destination
      </label>
      <select
        id="destination"
        value={selectedDestination}
        onChange={(e) => onDestinationChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Choose a destination...</option>
        {destinations.map((destination) => (
          <option key={destination._id} value={destination._id}>
            {destination.name}, {destination.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DestinationSelector; 